import { Router } from 'express'
const router = Router()
import { messageController } from '../controllers/chat.controller.js'
import {
    sendMessageController,
    deleteMessageController,
    unreadMessageController,
    deleteConversationController,
    blockUserController,
    unblockUserController,
    getPeopleToAddController,
} from '../controllers/chat.controller.js'
import passport from 'passport'
import '../strategies/passport-jwt.strategy.js'

router.get('/', (req, res) => {
    const currentUserId = req.user._id
    // console.log('Current User Id in /chat: ', currentUserId)
    return res.redirect(`/chat/${currentUserId}`)
})

router.get('/:id', messageController)

router.post('/get-people-to-add', getPeopleToAddController)

router.post('/send-message', sendMessageController)

router.post('/delete-message', deleteMessageController)

router.post('/unread-message', unreadMessageController)

router.post('/delete-conversation', deleteConversationController)

router.post('/block-user', blockUserController)

router.post('/unblock-user', unblockUserController)

export default router
