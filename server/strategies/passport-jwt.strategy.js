import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/users.model.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import * as CryptoEnc from '../helpers/crypto.helper.js'

const refreshToken = async (req) => {
    try {
        const encryptedRefreshToken = req.cookies.refreshToken
        if (!encryptedRefreshToken) {
            return null
        }
        const refreshToken = CryptoEnc.decryptWithCryptoJS(encryptedRefreshToken)

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
        const encryptedAccessToken = CryptoEnc.encryptWithCryptoJS(accessToken)

        req.cookies.accessToken = encryptedAccessToken
        return encryptedAccessToken
    } catch (error) {
        console.log('Error in refreshToken: ', error.message)
    }

    return null
}

const cookieExtractor = (req) => {
    if (req && req.cookies) {
        console.log('Cookies in cookieExtractor: ', req.cookies)

        const encryptedAccessToken = req.cookies.accessToken

        if (!encryptedAccessToken) {
            return null
        }

        const accessToken = CryptoEnc.decryptWithCryptoJS(encryptedAccessToken)
        return accessToken
    }
    return null
}

const options = {
    // jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken, cookieExtractor]),
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    passReqToCallback: true,
}

export default passport.use(
    new JwtStrategy(options, async (req, jwt_payload, done) => {
        try {
            // console.log('Jwt_payload in passport-jwt.strategy: ', jwt_payload)
            let user = await User.findById(jwt_payload.user)
            // console.log('User in passport-jwt.strategy: ', user._id)
            if (!user) return done(null, false)

            req.user = user
            return done(null, user._id)
        } catch (error) {
            console.log('Error in passport-jwt.strategy: ', error.message)
            return done(error, false)
        }
    })
)
