import { Router } from 'express'
const router = Router()
import { hashPassword } from '../helpers/password.helper.js'
import User from '../models/users.model.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import '../strategies/passport-jwt.strategy.js'
import '../strategies/passport-local.strategy.js'
import Auth from '../models/auth.model.js'
import * as CryptoEnc from '../helpers/crypto.helper.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

router.get('/jwt/refresh-token', async (req, res) => {
    const encryptedRefreshToken = req.cookies.refreshToken

    if (!encryptedRefreshToken) {
        return res.status(403).json({ error: 'Access Forbidden. No refresh token exists' })
    }

    try {
        const refreshTokenFromDb = await Auth.findOne({ refreshToken: encryptedRefreshToken })
        if (!refreshTokenFromDb) {
            return res.status(404).json({ error: 'Refresh token not found' })
        }

        const refreshToken = CryptoEnc.decryptWithCryptoJS(encryptedRefreshToken)
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        // console.log('refreshtokendb user: ', refreshTokenFromDb.user, 'Decoded user: ', decoded.user)
        if (refreshTokenFromDb.user.toString() !== decoded.user) {
            return res.status(403).json({ error: 'Access Forbidden. Invalid refresh token' })
        }

        // if the updated refresh token in older than 1 day, then send a new refresh token
        // if (Date.now() - refreshTokenFromDb.updatedAt.getTime() > 1000 * 30) {
        if (Date.now() - refreshTokenFromDb.updatedAt.getTime() > 1000 * 60 * 60 * 24) {
            const newRefreshToken = jwt.sign({ user: decoded.user }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '7d',
            })
            const newEncryptedRefreshToken = CryptoEnc.encryptWithCryptoJS(newRefreshToken)

            refreshTokenFromDb.refreshToken = newEncryptedRefreshToken
            await refreshTokenFromDb.save()

            console.log('New refresh token: ', newRefreshToken)
            res.cookie('refreshToken', newEncryptedRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            })
        }

        const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
        const encryptedAccessToken = CryptoEnc.encryptWithCryptoJS(accessToken)
        res.cookie('accessToken', encryptedAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 30, // 30 minutes
        })
        res.status(200).json({ message: 'Access token refreshed' })
    } catch (error) {
        return res.status(403).json({ error: error.message })
    }
})

router.get('/login', isAuthenticated, (req, res) => {
    if (req.user) {
        return res.redirect('/chat')
    }
    res.render('login')
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
    const user = req.user

    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const accessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
    const encryptedAccessToken = CryptoEnc.encryptWithCryptoJS(accessToken)

    const refreshToken = jwt.sign({ user: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    const encryptedRefreshToken = CryptoEnc.encryptWithCryptoJS(refreshToken)

    // Save the refresh token in db
    const findAuth = await Auth.findOne({ user: user._id })
    if (!findAuth) {
        const newAuth = new Auth({
            user: user._id,
            refreshToken: encryptedRefreshToken,
        })

        await newAuth.save()
    } else {
        findAuth.refreshToken = encryptedRefreshToken
        await findAuth.save()
    }

    res.cookie('accessToken', encryptedAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 30, // 30 minutes
    })

    res.cookie('refreshToken', encryptedRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    return res.status(200).json({ message: 'Login successful' })
    // res.setHeader('Authorization', `Bearer ${accessToken}`)
    // console.log('Authorization in login: ', res.getHeaders())
    // return res.redirect('/chat')
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

router.get('/logout', async (req, res) => {
    try {
        await new Promise((resolve, reject) => {
            req.logOut((err) => {
                if (err) {
                    reject(new Error('Error logging out'))
                } else {
                    resolve()
                }
            })
        })

        await new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject(new Error('Error destroying session'))
                } else {
                    resolve()
                }
            })
        })

        // Remove the refresh token from db and clear the cookie
        const encryptedRefreshToken = req.cookies.refreshToken
        if (!encryptedRefreshToken) {
            return res.status(403).json({ error: 'Access Forbidden. No refresh token exists' })
        }

        const authData = await Auth.findOneAndDelete({ refreshToken: encryptedRefreshToken })
        if (!authData) {
            return res.status(404).json({ error: 'Refresh token not found' })
        }

        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' })

        // Remove the access token from the cookie
        res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'strict' })
        return res.redirect('/auth/login')
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router
