import { Router } from 'express'
import { Conversation } from '../models/conversation.model.js'
import User from '../models/users.model.js'
import { decryptWithCryptoJS } from '../helpers/crypto.helper.js'
import AddedPeopleToChat from '../models/addedPeopleToChat.model.js'
import GroupMessage from '../models/groupMessage.model.js'
import { USER_MAP, GROUP_CONV_MAP } from '../server.js'
import { io, userSockets } from '../server.js'
import { updateUnreadCount } from '../helpers/conversation.helper.js'
import { getGroupConversationMap } from '../helpers/maps.helper.js'

const router = Router()

router.post('/create-group', async (req, res) => {
    const { groupMembersIds, groupName, groupDescription, groupAvatar } = req.body
    const creatorId = req.user._id

    const decryptedGroupMembersIds = groupMembersIds.map((id) => decryptWithCryptoJS(id))
    const groupMembers = [...decryptedGroupMembersIds, creatorId]

    try {
        let newConversation = new Conversation({
            participants: groupMembers,
            isGroup: true,
            groupName,
            groupDescription,
            groupAvatar,
        })

        await newConversation.save()

        // Add group members to the group
        const addGroupMembersPromises = groupMembers.map(async (memberId) => {
            try {
                let addedPeopleToGroup = await AddedPeopleToChat.findOne({ senderId: memberId })

                if (addedPeopleToGroup) {
                    addedPeopleToGroup.groups.push(newConversation._id)
                } else {
                    addedPeopleToGroup = new AddedPeopleToChat({
                        senderId: memberId,
                        groups: [newConversation._id],
                    })
                }

                await addedPeopleToGroup.save()
            } catch (error) {
                console.error(`Error processing group member ${memberId}:`, error)
            }
        })

        await Promise.all(addGroupMembersPromises)

        console.log('Group created successfully')

        // get the new group info
        let groupInfo = await Conversation.findOne({ _id: newConversation._id, isGroup: true }, { __v: 0, isBlocked: 0, blockedBy: 0 }).lean()

        // join the group room
        groupMembers.forEach((memberId) => {
            if (userSockets[memberId]) {
                io.to(userSockets[memberId]).emit('join-group', { roomId: newConversation._id, groupInfo, creatorName: USER_MAP[creatorId].name })
            }
        })

        // update GROUP_CONV_MAP
        GROUP_CONV_MAP = await getGroupConversationMap()

        return res.status(200).json({
            message: 'Group created successfully',
            success: true,
            groupInfo,
        })
    } catch (error) {
        console.error('Error creating group:', error.message)
        return res.status(400).json({ error: error.message, success: false })
    }
})

router.post('/get-group-conversation', async (req, res) => {
    let { groupId } = req.body

    let currentUser = await User.findOne(
        { _id: req.user._id },
        {
            _id: 1,
            encryptedId: 1,
        }
    )

    groupId = decryptWithCryptoJS(groupId)

    try {
        let groupConversation = await Conversation.findOne(
            { _id: groupId, isGroup: true },
            {
                isBlocked: 0,
                blockedBy: 0,
                __v: 0,
            }
        ).lean()

        if (groupConversation) {
            let groupMessagesPromises = groupConversation.messages.map((msgId) => {
                return GroupMessage.findOne(
                    { _id: msgId, groupId: groupId },
                    {
                        groupId: 0,
                        __v: 0,
                    }
                ).lean()
            })

            let groupMessages = await Promise.all(groupMessagesPromises)
            groupMessages = groupMessages.filter((msg) => msg !== null)

            const updatedGroupMessages = await Promise.all(
                groupMessages.map(async (msg) => {
                    // console.log('msg:', msg)
                    const user = USER_MAP[msg.senderId.toString()]
                    return {
                        _id: msg._id,
                        senderId: user.encryptedId,
                        senderName: user.name,
                        message: msg.message,
                        createdAt: msg.createdAt,
                    }
                })
            )

            // Send response first
            res.status(200).json({
                requesterId: currentUser.encryptedId,
                groupMessages: updatedGroupMessages,
                groupInfo: groupConversation,
            })

            // Update unread count after sending the response
            process.nextTick(async () => {
                let unreadMsgs = groupConversation.unreadMsgCount.filter((obj) =>
                    obj.receivers.some((rec) => rec.toString() === currentUser._id.toString())
                )

                if (unreadMsgs.length > 0) {
                    unreadMsgs.forEach((unreadMsg) => {
                        unreadMsg.unreadCount = 0
                    })

                    try {
                        await Conversation.findByIdAndUpdate(
                            { _id: groupId, isGroup: true },
                            {
                                unreadMsgCount: groupConversation.unreadMsgCount,
                            },
                            { new: true }
                        )
                    } catch (error) {
                        console.log('Error updating unread count: ', error.message)
                    }
                } else {
                    console.log('No unread messages to update')
                }
            })
        } else {
            res.status(200).json({ requesterId: currentUser.encryptedId, groupMessages: [], groupInfo: {} })
        }
    } catch (error) {
        console.log('Error getting group conversation: ', error.message)
        res.status(400).json({ error: error.message })
    }
})

router.post('/send-group-message', async (req, res) => {
    const { groupId, msg } = req.body
    const senderId = req.user._id
    let sender = USER_MAP[senderId]

    try {
        const decryptedGroupId = decryptWithCryptoJS(groupId)

        const newGroupMessage = new GroupMessage({
            groupId: decryptedGroupId,
            senderId,
            message: msg,
        })

        await newGroupMessage.save()
        // console.log('newGroupMessage:', newGroupMessage)

        // Add the message to the conversation - done in the pre hook

        // Get the group conversation
        const groupConversation = await Conversation.findOne({ _id: decryptedGroupId, isGroup: true })

        // console.log('groupConversation:', groupConversation)

        // Send the message to all group members
        const groupMembers = groupConversation.participants
        // console.log('userSockets in send group message:', userSockets)

        groupMembers.forEach(async (memberId) => {
            // console.log('Sending message to:', memberId, 'from:', senderId)
            if (userSockets[memberId] && memberId.toString() !== senderId.toString()) {
                io.to(userSockets[memberId])
                    .timeout(2000)
                    .emit(
                        'group-message',
                        {
                            groupId,
                            message: newGroupMessage.message,
                            msgId: newGroupMessage._id,
                            createdAt: newGroupMessage.createdAt,
                            senderName: sender.name,
                        },
                        async (err, ack) => {
                            if (err) {
                                console.error('Error sending group message:', err)
                                throw new Error(err)
                            }

                            if (ack[0].status === 'success') {
                                console.log('Message sent successfully to ', memberId)
                            } else if (ack[0].status === 'failure') {
                                console.error('Error sending group message:', ack[0].error)
                                throw new Error(ack[0].error)
                            } else {
                                const unreadResult = await updateUnreadCount(senderId, memberId, true)
                                if (unreadResult.success) {
                                    console.log('Updated unread count successfully')
                                } else {
                                    console.error('Error updating unread count:', unreadResult.error)
                                    throw new Error(unreadResult.error)
                                }
                            }
                        }
                    )
            } else if (!userSockets[memberId]) {
                const unreadResult = await updateUnreadCount(senderId, memberId, true)
                if (unreadResult.success) {
                    console.log('Updated unread count successfully')
                } else {
                    console.error('Error updating unread count:', unreadResult.error)
                    throw new Error(unreadResult.error)
                }
            }
        })

        return res.status(200).json({
            status: 'Message sent successfully',
            success: true,
            msgInfo: {
                _id: newGroupMessage._id,
                groupId: newGroupMessage.groupId,
                senderId: sender.encryptedId,
                message: newGroupMessage.message,
                createdAt: newGroupMessage.createdAt,
            },
        })
    } catch (error) {
        console.error('Error sending group message:', error.message)
        return res.status(400).json({ error: error.message })
    }
})

// delete message
router.post('/delete-group-message', async (req, res) => {
    const { msgId, groupId } = req.body
    // console.log('msgId:', msgId, 'groupId:', groupId)
    const currentUserId = req.user._id
    let currentUser = USER_MAP[currentUserId]

    try {
        const decryptedGroupId = decryptWithCryptoJS(groupId)

        let groupMessage = await GroupMessage.findOne({ _id: msgId, groupId: decryptedGroupId, senderId: currentUserId })

        if (!groupMessage) {
            console.log('Group message not found')
            return res.status(404).json({ error: 'Message not found' })
        }

        let deleteRes = await groupMessage.deleteOne()

        if (deleteRes.acknowledged !== true) {
            console.log('Error deleting group message')
            return res.status(400).json({ error: 'Error deleting group message' })
        }

        let group = await Conversation.findOne({ _id: decryptedGroupId, isGroup: true })

        if (!group) {
            console.log('Group not found')
            return res.status(404).json({ error: 'Group not found' })
        }

        // console.log('userSockets in delete group message:', userSockets)
        let groupMembers = group.participants.map((memberId) => {
            return {
                memberId,
                socketId: userSockets[memberId],
            }
        })

        // console.log('groupMembers:', groupMembers)

        groupMembers.forEach((member) => {
            if (member.socketId) {
                // console.log('groupId:', groupId, 'msgId:', msgId)
                io.to(member.socketId).emit('delete-group-message', { groupId, msgId, deletedBy: currentUser.name })
            } else {
                console.log('Socket not found for member: ', member.memberId)
            }
        })

        return res.status(200).json({ status: 'Group message deleted successfully', success: true })
    } catch (error) {
        console.error('Error deleting group message:', error.message)
        return res.status(400).json({ error: error.message })
    }
})

//~ leave and delete group
router.post('/leave-and-delete-group', async (req, res) => {
    const { groupId } = req.body
    const currentUserId = req.user._id

    try {
        const decryptedGroupId = decryptWithCryptoJS(groupId)

        let findGroup = await Conversation.findOne({ _id: decryptedGroupId, isGroup: true })

        if (!findGroup) {
            console.log('Group not found in /leave-and-delete-group')
            return res.status(404).json({ error: 'Group not found' })
        }

        findGroup.participants = findGroup.participants.filter((memberId) => memberId.toString() !== currentUserId.toString())

        if (findGroup.participants.length === 0) {
            console.log('Group has no members left. Deleting group...')
            await findGroup.deleteOne()

            // update GROUP_CONV_MAP
            GROUP_CONV_MAP = await getGroupConversationMap()
        } else {
            await findGroup.save()
        }

        // remove group from user's groups
        let user = await AddedPeopleToChat.findOne({ senderId: currentUserId })

        if (user) {
            user.groups = user.groups.filter((group) => group.toString() !== decryptedGroupId.toString())
            await user.save()
        }

        // send response
        return res.status(200).json({ status: 'Group left and deleted successfully', success: true })
    } catch (error) {
        console.error('Error leaving and deleting group:', error.message)
        return res.status(400).json({ error: error.message })
    }
})

// get group members
router.post('/get-group-members', async (req, res) => {
    const { groupId } = req.body
    const currentUserId = req.user._id

    try {
        const decryptedGroupId = decryptWithCryptoJS(groupId)

        const findGroup = await Conversation.findOne(
            { _id: decryptedGroupId, isGroup: true },
            {
                participants: 1,
                groupId: 1,
            }
        ).lean()

        if (!findGroup) {
            console.log('Group not found in /get-group-members')
            return res.status(404).json({ error: 'Group not found' })
        }

        // console.log('findGroup:', findGroup)
        let groupMembersPromises = findGroup.participants.map(async (memberId) => {
            let member = await User.findOne(
                { _id: memberId },
                {
                    _id: 1,
                    encryptedId: 1,
                    name: 1,
                    username: 1,
                    avatar: 1,
                }
            ).lean()

            return member
        })

        let groupMembers = await Promise.all(groupMembersPromises)

        // console.log('groupMembers:', groupMembers)
        // groupMembers = groupMembers.filter((member) => member._id.toString() !== currentUserId.toString())

        return res.status(200).json({ groupMembers, success: true })
    } catch (error) {}
})

// join user using group link
router.get('/join-group-via-link', async (req, res) => {
    try {
        const groupId = req.query.id || null
        // console.log('groupId:', groupId)
        if (!groupId) {
            return res.status(400).json({ error: 'Invalid group link' })
        }
        const currentUserId = req.user._id
        const decryptedGroupId = decryptWithCryptoJS(groupId)

        let findGroup = await Conversation.findOne({ _id: decryptedGroupId, isGroup: true })

        if (!findGroup) {
            return res.status(404).render('404', { error: 'Group not found', code: 404 })
        }

        if (findGroup.participants.some((memberId) => memberId.toString() === currentUserId.toString())) {
            return res.redirect('/chat')
        } else {
            findGroup.participants.push(currentUserId)
            await findGroup.save()
        }

        let addedPeopleUser = await AddedPeopleToChat.findOne({ senderId: currentUserId })

        if (addedPeopleUser) {
            if (addedPeopleUser.groups.some((group) => group.toString() === decryptedGroupId.toString())) {
                return res.redirect('/chat')
            } else {
                addedPeopleUser.groups.push(decryptedGroupId)
                await addedPeopleUser.save()
            }
        } else {
            addedPeopleUser = new AddedPeopleToChat({
                senderId: currentUserId,
                groups: [decryptedGroupId],
            })

            await addedPeopleUser.save()
        }

        return res.status(200).redirect('/chat')
    } catch (error) {
        console.error('Error joining group via link:', error.message)
        return res.status(404).render('404', { error: 'Internal server error', code: 404 })
    }
})

export default router
