import { Router } from 'express'
const router = Router()
import addPeopleToChatRouter from './addPeopleToChat.route.js'
import conversationRouter from './conversation.route.js'
import chatRouter from './chat.route.js'
import searchPeopleRouter from './searchPeople.route.js'
import avatarRouter from './avatar.route.js'
import changeDetailsRouter from './changeDetails.route.js'
import authRouter from './auth.route.js'
import groupRouter from './groupChat.route.js'
import '../strategies/passport-jwt.strategy.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

router.use('/auth/', authRouter)
router.use('/add-people-api/', isAuthenticated, addPeopleToChatRouter)
router.use('/conv-api/', isAuthenticated, conversationRouter)
router.use('/chat/', isAuthenticated, chatRouter)
router.use('/search/', isAuthenticated, searchPeopleRouter)
router.use('/api/', avatarRouter)
router.use('/api/', isAuthenticated, changeDetailsRouter)
router.use('/group-chat-api/', isAuthenticated, groupRouter)

export default router
