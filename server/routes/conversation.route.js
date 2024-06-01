import { Router } from 'express'
const router = Router()
import Conversation from '../models/conversation.model.js'
import getConversation from '../helpers/conversation.helper.js'
import User from '../models/users.model.js'

router.post('/get-conversation', async (req, res) => {
    const senderId = req.user._id
    const { receiverId } = req.body
    // console.log(senderId, receiverId);

    try {
        const findConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        // console.log("findConversation", findConversation);
        if (findConversation) {
            if (findConversation.messages.length === 0) {
                return res.status(200).json({
                    messages: [],
                    isBlocked: findConversation.isBlocked,
                    blockedBy: findConversation.blockedBy,
                })
            } else {
                try {
                    findConversation.unreadMsgCount.forEach((obj) => {
                        if (obj.senderId.toString() === receiverId.toString()) {
                            // console.log("obj unreadCount", obj.unreadCount);
                            obj.unreadCount = 0
                        }
                    })
                    await findConversation.save()
                    const conversation = await getConversation(findConversation.messages)

                    return res.status(200).json({
                        messages: conversation,
                        isBlocked: findConversation.isBlocked,
                        blockedBy: findConversation.blockedBy,
                        senderId: senderId,
                    })
                } catch (error) {
                    console.log('Error getting conversation: ', error.message)
                }
            }
        } else {
            return res.status(200).json({ messages: [], isBlocked: false, blockedBy: null })
        }
    } catch (error) {
        console.log('Error getting conversation: ', error.message)
    }
})

router.post('/user-details', async (req, res) => {
    const { username } = req.body

    try {
        const user = await User.findOne(
            { username },
            {
                _id: 1,
                name: 1,
                username: 1,
                gender: 1,
                avatar: 1,
            }
        )

        console.log('inside /user-details', user.name)
        return res.status(200).json(user)
    } catch (err) {
        console.log('Error getting user details: ', err.message)
        return res.status(400).json({ error: err.message })
    }
})

export default router