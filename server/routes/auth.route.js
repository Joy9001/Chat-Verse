import { Router } from 'express'
const router = Router()
import { hashPassword, comparePassword } from '../helpers/password.helper.js'
import User from '../models/users.model.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import '../strategies/passport-jwt.strategy.js'
import '../strategies/passport-local.strategy.js'

router.get('/jwt/refreshtoken', (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(403).json({ error: 'Access Forbidden. No refresh token exists' })
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000, // 1 hour
        })
        res.status(200).json({ message: 'Access token refreshed' })
    } catch (error) {
        return res.status(403).json({ error: error.message })
    }
})

router.get('/login', (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log('Error in login: ', err.message)
            return next(err)
        }

        if (user) {
            return res.redirect('/chat')
        }

        console.log('Info in login: ', info.message)
        res.render('login')
    })(req, res, next)
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    const user = req.user

    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
    const refreshToken = jwt.sign({ user: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000, // 1 hour
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return res.status(200).json({ message: 'Login successful', accessToken, refreshToken })
})

router.get('/register', (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log('Error in register: ', err.message)
            return next(err)
        }

        if (user) {
            return res.redirect('/chat')
        }

        console.log('Info in register: ', info.message)
        res.render('register')
    })(req, res, next)
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
    req.logOut((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' })
        }
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return res.redirect('/auth/login')
    })
})

export default router
