import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/users.model.js'
import { hashPassword, comparePassword } from '../helpers/password.helper.js'
import { identicon } from '@dicebear/collection'

passport.serializeUser((user, done) => {
    console.log('Inside Serialize User')
    const userSession = {
        _id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        gender: user.gender,
        avatar: user.avatar,
    }
    done(null, userSession)
})

passport.deserializeUser(async (userSession, done) => {
    console.log('Inside Deserialize User')
    try {
        const findUser = await User.findById(userSession._id)
        if (!findUser) throw new Error('User not found')
        done(null, findUser)
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
                console.log('Inside Local Strategy', findUser)
                if (!findUser) throw new Error('User not found')
                const isPasswordMatch = await comparePassword(password, findUser.password)
                if (!isPasswordMatch) throw new Error('Invalid credentials')
                done(null, findUser)
            } catch (err) {
                console.log('Error in Local Strategy: ', err.message)
                done(err, null)
            }
        }
    )
)
