import passport from 'passport'
import { GoogleOneTapStrategy } from 'passport-google-one-tap'
import User from '../models/users.model.js'

export default passport.use(
    new GoogleOneTapStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        async (profile, done) => {
            console.log('profile in google one tap: ', profile)
            const googleId = profile.id
            const name = profile.displayName
            const email = profile.emails[0].value
            const provider = profile.provider

            try {
                const findUser = await User.findOne({ providerId: googleId })
                console.log('findUser in google: ', findUser)
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
