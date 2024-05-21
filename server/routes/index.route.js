import { Router } from 'express'
const router = Router()
import { messageController } from '../controllers/chat.controller.js'

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/chats/:id', messageController)

export default router
