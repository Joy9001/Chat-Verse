import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/users.model.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import * as CryptoEnc from '../helpers/crypto.helper.js'

const cookieExtractor = (req) => {
    if (req && req.cookies) {
        // console.log('Cookies in cookieExtractor: ', req.cookies)

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

            const userSession = {
                _id: user._id,
            }
            req.user = userSession
            return done(null, userSession)
        } catch (error) {
            console.log('Error in passport-jwt.strategy: ', error.message)
            return done(error, false)
        }
    })
)
