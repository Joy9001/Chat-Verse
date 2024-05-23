import { Router } from 'express'
const router = Router()
import addPeopleToChatRouter from './addPeopleToChat.route.js'
import conversationRouter from './conversation.route.js'
import chatRouter from './chat.route.js'
import searchPeopleRouter from './searchPeople.route.js'
import avatarRouter from './avatar.route.js'
import changeDetailsRouter from './changeDetails.route.js'
import authRouter from './auth.route.js'

router.use('/auth/', authRouter)
router.use('/add-people-api/', addPeopleToChatRouter)
router.use('/get-conv-api/', conversationRouter)
router.use('/chat/', chatRouter)
router.use('/search/', searchPeopleRouter)
router.use('/api/', avatarRouter)
router.use('/api/', changeDetailsRouter)

export default router
