import Message from '../models/message.model.js'
import { Conversation } from '../models/conversation.model.js'

const getConversation = async (messages) => {
    try {
        const promises = messages.map(async (message) => {
            const findMessage = await Message.findOne({ _id: message._id })
            return findMessage
        })

        const conversation = await Promise.all(promises)
        return conversation
    } catch (error) {
        console.log('Error getting conversation inside getConversation: ', error.message)
    }
}

const updateUnreadCount = async (senderId, receiverId, isGroup) => {
    try {
        const conv = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
            isGroup: isGroup,
        })
        if (conv) {
            // console.log('conv')
            const unreadMsgCount = conv.unreadMsgCount.find((obj) => {
                return obj.senderId.toString() === senderId.toString() && obj.receivers.some((rec) => rec.toString() === receiverId.toString())
            })
            if (unreadMsgCount) {
                // console.log('unreadMsgCount', unreadMsgCount)
                unreadMsgCount.unreadCount += 1
            } else {
                // console.log('!unreadMsgCount')
                conv.unreadMsgCount.push({
                    senderId: senderId,
                    receivers: [receiverId],
                    unreadCount: 1,
                })
            }
            await conv.save()
        } else {
            // console.log('!conv')
            const newConversation = new Conversation({
                participants: [senderId, receiverId],
                unreadMsgCount: [
                    {
                        senderId: senderId,
                        receivers: [receiverId],
                        unreadCount: 1,
                    },
                ],
            })
            await newConversation.save()
        }
        return {
            success: true,
            message: 'Updated unread count successfully',
        }
    } catch (error) {
        console.log('Error updating unread count inside updateUnreadCount: ', error.message)
        return {
            success: false,
            error: 'Error updating unread count',
        }
    }
}

export { getConversation, updateUnreadCount }
