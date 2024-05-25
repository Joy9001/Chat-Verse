import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../models/users.model.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const refreshToken = async (req) => {
    const refreshToken = req.cookies?.refreshToken
    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const user = await User.findById(decoded.user)
            if (!user) return null

            const newAccessToken = jwt.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s',
            })
            req.cookies.accessToken = newAccessToken

            // console.log('cookies in refreshToken', req.cookies)
            console.log('New Access Token in refreshToken', newAccessToken)
            return newAccessToken
        } catch (error) {
            console.log('Refresh token error in cookieExtractor: ', error.message)
            return null
        }
    }
    return null
}

const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        // console.log('Cookies in cookieExtractor: ', req.cookies)
        token = req.cookies.accessToken
    }
    return token
}

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    ignoreExpiration: true,
    passReqToCallback: true,
}

export default passport.use(
    new JwtStrategy(options, async (req, jwt_payload, done) => {
        try {
            // console.log('Jwt_payload in passport-jwt.strategy: ', jwt_payload)
            let user = await User.findById(jwt_payload.user)
            // console.log('User in passport-jwt.strategy: ', user._id)
            if (!user) return done(null, false)

            const accessToken = req.cookies.accessToken
            // console.log('Access Token in passport-jwt.strategy: ', accessToken)

            try {
                const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            } catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    console.log('Token expired in passport-jwt.strategy: ', error.message)
                    const newAccessToken = await refreshToken(req)
                    console.log('Token refreshed in passport-jwt.strategy: ', newAccessToken)
                    if (!newAccessToken) {
                        return done(null, false)
                    }
                    user = {
                        ...user.toObject(),
                        accessToken: newAccessToken,
                    }
                    // console.log('User in passport-jwt.strategy after refresh: ', user)
                    return done(null, user)
                }
            }
            return done(null, user)
        } catch (error) {
            console.log('Error in passport-jwt.strategy: ', error.message)
            return done(error, false)
        }
    })
)
