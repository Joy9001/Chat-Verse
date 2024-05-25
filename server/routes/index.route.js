import { Router } from 'express'
const router = Router()
import addPeopleToChatRouter from './addPeopleToChat.route.js'
import conversationRouter from './conversation.route.js'
import chatRouter from './chat.route.js'
import searchPeopleRouter from './searchPeople.route.js'
import avatarRouter from './avatar.route.js'
import changeDetailsRouter from './changeDetails.route.js'
import authRouter from './auth.route.js'
import passport from 'passport'
import '../strategies/passport-jwt.strategy.js'

router.use('/auth/', authRouter)
router.use('/add-people-api/', passport.authenticate('jwt'), addPeopleToChatRouter)
router.use('/get-conv-api/', passport.authenticate('jwt'), conversationRouter)
router.use('/chat/', passport.authenticate('jwt'), chatRouter)
router.use('/search/', passport.authenticate('jwt'), searchPeopleRouter)
router.use('/api/', avatarRouter)
router.use('/api/', passport.authenticate('jwt'), changeDetailsRouter)

export default router
