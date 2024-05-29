import addPeople from '../helpers/addPeople.helper.js'
import { getPeopleToChat } from '../helpers/addPeopleToChat.helper.js'
import getCurrentChatPeople from '../helpers/getCurrentChatPeople.helper.js'
import Message from '../models/message.model.js'
import Conversation from '../models/conversation.model.js'
import AddedPeopleToChat from '../models/addedPeopleToChat.model.js'
import { addPeopleToChat } from '../helpers/addPeopleToChat.helper.js'
import User from '../models/users.model.js'
import { io } from '../server.js'
import { getReceiverSocketId } from '../helpers/socket.helper.js'

const messageController = async (req, res) => {
    // console.log('Current User in /chat/:id: ', req.user)
    const currentUserId = req.user._id

    const currentUser = await User.findById(currentUserId)
    if (!currentUser) return res.status(404).json({ message: 'User not found' })

    let unreadMesseges = []

    try {
        const peopleToAdd = await addPeople(currentUserId)
        const currentUserAddedPeopleToChat = await getPeopleToChat(currentUserId)

        let currentChatPeople = []
        if (currentUserAddedPeopleToChat) {
            currentChatPeople = await getCurrentChatPeople(currentUserAddedPeopleToChat.recivers)
        }

        const unreadMessagePromises = currentChatPeople.map(async (person) => {
            let findConversation = await Conversation.findOne({
                participants: { $all: [currentUserId, person._id] },
            })

            if (findConversation) {
                let findUnreadMsgCount = findConversation.unreadMsgCount.find(
                    (obj) => obj.senderId.toString() === person._id.toString()
                )

                if (findUnreadMsgCount) {
                    unreadMesseges.push(findUnreadMsgCount)
                } else {
                    unreadMesseges.push({
                        senderId: person._id,
                        receiverId: currentUserId,
                        unreadCount: 0,
                    })
                }
            } else {
                unreadMesseges.push({
                    senderId: person._id,
                    receiverId: currentUserId,
                    unreadCount: 0,
                })
            }
        })

        await Promise.all(unreadMessagePromises)

        // console.log("Unread Msg Count: ", unreadMesseges);
        // console.log('req user', req.user)

        // Refresh the access token if expired
        if (req.user.accessToken) {
            console.log('Set the accessToken in cookie inside messageController', req.user.accessToken)
            return res
                .cookie('accessToken', req.user.accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 1000 * 30, // 30 seconds
                })
                .render('chat', {
                    peopleToAdd,
                    currentChatPeople,
                    unreadMesseges,
                    currentUser,
                })
        }
        // console.log('res cookies', res.cookies)

        return res.render('chat', {
            peopleToAdd,
            currentChatPeople,
            unreadMesseges,
            currentUser,
        })
    } catch (error) {
        console.log('Error getting people inside messageController: ', error)
    }
}

const sendMessageController = async (req, res) => {
    const senderId = req.user._id
    const { receiverId, message } = req.body

    try {
        const msg = new Message({
            senderId,
            receiverId,
            message,
        })

        const savedMsg = await msg.save()
        // console.log("Message saved: ", savedMsg);
        let senderUsername = await User.findOne({ _id: senderId }, { _id: 0, username: 1 })
        // Socket functionality
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', savedMsg, senderUsername['username'])
            console.log('Message sent to receiver', receiverSocketId)
        }

        res.status(201).send(savedMsg)
    } catch (error) {
        console.log('Error sending message: ', error.message)
        res.status(400).json({ messege: error.message })
    }
}

const deleteMessageController = async (req, res) => {
    const senderId = req.user._id
    const { receiverId, msgId } = req.body
    let senderUsername = await User.findOne({ _id: senderId }, { _id: 0, username: 1 })
    // console.log("Message Id: ", msgId);
    try {
        const findMsg = await Message.findOne({
            _id: msgId,
        })
        if (findMsg) {
            try {
                let deleteRes = await findMsg.deleteOne()

                if (deleteRes.acknowledged === true) {
                    // Socket functionality
                    const receiverSocketId = getReceiverSocketId(receiverId)
                    if (receiverSocketId) {
                        io.to(receiverSocketId).emit('deleteMessage', msgId, senderUsername.username)
                        console.log('Deleted Message Id sent to receiver', receiverSocketId)
                    }
                    return res.status(200).json({ message: 'Message deleted' })
                }

                // await Conversation.updateOne(
                // 	{
                // 		participants: { $all: [senderId, receiverId] },
                // 	},
                // 	{
                // 		$pull: { messages: msgId },
                // 	}
                // );
                // console.log(deleteMessage);
            } catch (error) {
                console.log('Error deleting message: ', error.message)
                return res.json({ message: 'Error deleting message' })
            }
        } else {
            return res.json({ message: 'Message not found' })
        }
    } catch (error) {
        console.log('Error finding message: ', error.message)
        return res.json({ message: 'Error finding message' })
    }
}

const unreadMessageController = async (req, res) => {
    const { senderUsername, receiverId, unreadMsgCount } = req.body
    // console.log(senderId, receiverId, unreadMsgCount);
    try {
        const senderId = await User.findOne({ username: senderUsername }, { _id: 1 })
        // console.log('inside unreadMessageController:', senderId, receiverId, unreadMsgCount)
        console.log('inside unreadMessageController:', senderId)
        let findConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (findConversation) {
            let findUnreadMsgCount = findConversation.unreadMsgCount.find(
                (obj) => obj.senderId.toString() === senderId._id.toString()
            )

            // console.log("findUnreadMsgCount: ", findUnreadMsgCount);
            if (findUnreadMsgCount) {
                findUnreadMsgCount.unreadCount = unreadMsgCount
            } else {
                findConversation.unreadMsgCount.push({
                    senderId: senderId,
                    receiverId: receiverId,
                    unreadCount: unreadMsgCount,
                })
            }
            await findConversation.save()
        } else {
            let newConversation = new Conversation({
                participants: [senderId, receiverId],
                unreadMsgCount: [
                    {
                        senderId: senderId,
                        receiverId: receiverId,
                        unreadCount: unreadMsgCount,
                    },
                ],
            })
            await newConversation.save()
        }
        return res.status(200).json({ message: 'Unread message count updated' })
    } catch (error) {
        console.log('Error updating unread message count: ', error)
    }
}

const deleteConversationController = async (req, res) => {
    const senderId = req.user._id
    const { receiverId } = req.body
    try {
        const findConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (findConversation) {
            await findConversation.deleteOne()
        } else {
            console.log('Conversation not found')
        }

        // Delete the receiver from AddedPeopleToChat
        await AddedPeopleToChat.findOneAndUpdate(
            {
                senderId: senderId,
            },
            {
                $pull: { recivers: receiverId },
            }
        )

        // Delete the sender from AddedPeopleToChat
        await AddedPeopleToChat.findOneAndUpdate(
            {
                senderId: receiverId,
            },
            {
                $pull: { recivers: senderId },
            }
        )

        // Socket functionality
        const receiverSocketId = getReceiverSocketId(receiverId)
        let senderUsername = await User.findOne({ _id: senderId }, { _id: 0, username: 1 })
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('deleteConversation', senderUsername.username)
            console.log('Deleted Conversation sent to receiver', receiverSocketId)
        }
        return res.status(200).json({ message: 'Conversation deleted' })
    } catch (error) {
        console.log('Error deleting conversation: ', error.message)
        return res.status(400).json({ message: 'Error deleting conversation' })
    }
}

const blockUserController = async (req, res) => {
    const senderId = req.user._id
    const { receiverId } = req.body
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (conversation) {
            conversation.isBlocked = true
            conversation.blockedBy = senderId
            await conversation.save()
        } else {
            let newConversation = new Conversation({
                participants: [senderId, receiverId],
                isBlocked: true,
            })
            await newConversation.save()
        }

        // Socket functionality
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('blockUser', senderId)
            console.log('Blocked User sent to receiver', receiverSocketId)
        }

        return res.status(200).json({ message: 'User blocked' })
    } catch (error) {
        console.log('Error blocking user: ', error.message)
        return res.status(400).json({ message: 'Error blocking user' })
    }
}

const unblockUserController = async (req, res) => {
    const senderId = req.user._id
    const { receiverId } = req.body
    // console.log('Unblock user: ', senderId, receiverId)

    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        // console.log('Conversation: ', conversation)

        if (conversation) {
            // console.log("Id compare: ", conversation.blockedBy, senderId);
            if (conversation.blockedBy.equals(senderId)) {
                conversation.isBlocked = false
                conversation.blockedBy = null
                await conversation.save()

                // Socket functionality
                const receiverSocketId = getReceiverSocketId(receiverId)
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('unblockUser', senderId)
                    console.log('Unblocked User sent to receiver', receiverSocketId)
                }
            } else {
                return res.status(400).json({
                    message: 'Conversation is not blocked by you',
                })
            }
        } else {
            return res.status(400).json({ message: 'Conversation not found' })
        }
        // } else {
        // 	let newConversation = new Conversation({
        // 		participants: [senderId, receiverId],
        // 		isBlocked: false,
        // 	});
        // 	await newConversation.save();
        // }

        return res.status(200).json({ message: 'User unblocked' })
    } catch (error) {
        console.log('Error unblocking user: ', error.message)
        return res.status(400).json({ message: 'Error unblocking user' })
    }
}

const getPeopleToAddController = async (req, res) => {
    const { currentUserId } = req.body

    try {
        const people = await addPeople(currentUserId)
        return res.status(200).json({ people })
    } catch (error) {
        console.log('Error getting people to add: ', error.message)
        return res.status(400).json({ message: 'Error getting people to add' })
    }
}

export {
    messageController,
    sendMessageController,
    deleteMessageController,
    unreadMessageController,
    deleteConversationController,
    blockUserController,
    unblockUserController,
    getPeopleToAddController,
}
