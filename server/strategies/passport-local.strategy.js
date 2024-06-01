import passport from 'passport'
import User from '../models/users.model.js'
import { comparePassword } from '../helpers/password.helper.js'
import { Strategy as LocalStrategy } from 'passport-local'

passport.serializeUser((user, done) => {
    console.log('Inside Serialize User', user)
    let userSession = {
        _id: user._id,
    }
    done(null, userSession)
})

passport.deserializeUser(async (userSession, done) => {
    console.log('Inside Deserialize User')
    try {
        console.log('User Session in Deserialize User: ', userSession)
        const findUser = await User.findById(userSession._id)
        if (!findUser) throw new Error('User not found')

        const user = {
            _id: findUser?._id,
        }
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (username, password, done) => {
            try {
                const findUser = await User.findOne({ email: username })
                // console.log('Inside Local Strategy', findUser._id)
                if (!findUser) throw new Error('User not found')
                const isPasswordMatch = await comparePassword(password, findUser.password)
                if (!isPasswordMatch) throw new Error('Invalid credentials')

                const userSession = {
                    _id: findUser._id,
                }
                done(null, userSession)
            } catch (err) {
                console.log('Error in Local Strategy: ', err.message)
                done(err, null)
            }
        }
    )
)
