import { Router } from 'express'
const router = Router()
import {
    sendMessageController,
    deleteMessageController,
    unreadMessageController,
    deleteConversationController,
    blockUserController,
    unblockUserController,
    getPeopleToAddController,
} from '../controllers/chat.controller.js'

router.post('/get-people-to-add', getPeopleToAddController)

router.post('/send-message', sendMessageController)

router.post('/delete-message', deleteMessageController)

router.post('/unread-message', unreadMessageController)

router.post('/delete-conversation', deleteConversationController)

router.post('/block-user', blockUserController)

router.post('/unblock-user', unblockUserController)

export default router
