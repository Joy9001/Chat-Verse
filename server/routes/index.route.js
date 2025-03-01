import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import '../strategies/passport-jwt.strategy.js';
import addPeopleToChatRouter from './addPeopleToChat.route.js';
import authRouter from './auth.route.js';
import avatarRouter from './avatar.route.js';
import changeDetailsRouter from './changeDetails.route.js';
import chatRouter from './chat.route.js';
import conversationRouter from './conversation.route.js';
import groupRouter from './groupChat.route.js';
import searchPeopleRouter from './searchPeople.route.js';
const router = Router();

// Authentication routes
router.use('/auth/', authRouter);

// Protected API routes
router.use('/add-people/', isAuthenticated, addPeopleToChatRouter);
router.use('/conversations/', isAuthenticated, conversationRouter);
router.use('/chat/', isAuthenticated, chatRouter);
router.use('/search/', isAuthenticated, searchPeopleRouter);
router.use('/user/', avatarRouter); // Partial public access for avatar generation
router.use('/user/', isAuthenticated, changeDetailsRouter);
router.use('/group-chat/', isAuthenticated, groupRouter);

export default router;
