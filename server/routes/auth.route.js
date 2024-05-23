import { Router } from 'express'
import { hashPassword, comparePassword } from '../helpers/password.helper.js'
import User from '../models/users.model.js'
import passport from 'passport'
import '../strategies/local.strategy.js'
const router = Router()

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/chat')
    }
    res.render('login')
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json(req.user)
})

router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/chat')
    }
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { email, password, name, username, gender, avatar } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password can't be empty" })
    }

    if (!name || !username || !gender || !avatar) {
        return res.status(400).json({ error: 'Please fill all the details in the change details section' })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = new User({
        email,
        password: hashedPassword,
        name,
        username,
        gender,
        avatar,
    })

    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        console.log('Error in register: ', error.message)
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email or username already exists' })
        }
        res.status(400).json({ error: error.message })
    }
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('Error in logout: ', err.message)
            return res.status(500).json({ error: err.message })
        }
    })
    res.redirect('/login')
})

export default router
