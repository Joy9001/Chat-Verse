import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../models/users.model.js'
import dotenv from 'dotenv'
dotenv.config()

export default passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
            state: true,
        },
        async (acessToken, refreshToken, profile, done) => {
            const googleId = profile.id
            const name = profile.displayName
            const email = profile.emails[0].value
            const provider = profile.provider

            try {
                const findUser = await User.findOne({ providerId: googleId })
                // console.log('findUser in google: ', findUser)
                if (!findUser) {
                    console.log('found no user in google')
                    const newUser = new User({
                        name,
                        email,
                        providerId: googleId,
                        provider,
                    })

                    await newUser.save()

                    const user = await User.findOne({ providerId: googleId })

                    const userSession = {
                        _id: user._id,
                    }
                    return done(null, userSession)
                } else {
                    const userSession = {
                        _id: findUser._id,
                    }
                    return done(null, userSession)
                }
            } catch (error) {
                console.error('Error in GoogleStrategy: ', error.message)
                return done(error, false)
            }
        }
    )
)
