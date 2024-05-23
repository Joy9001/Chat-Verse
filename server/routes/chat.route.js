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
import isAuthenticated from '../helpers/auth.helper.js'

router.get('/', isAuthenticated, (req, res) => {
    const currentUserId = req.session.passport.user._id
    if (!currentUserId) {
        res.status(401).json({ error: 'Unauthorized' })
    }
    return res.redirect(`/chat/${currentUserId}`)
})

router.get('/:id', isAuthenticated, messageController)

router.post('/get-people-to-add', getPeopleToAddController)

router.post('/send-message', sendMessageController)

router.post('/delete-message', deleteMessageController)

router.post('/unread-message', unreadMessageController)

router.post('/delete-conversation', deleteConversationController)

router.post('/block-user', blockUserController)

router.post('/unblock-user', unblockUserController)

export default router
