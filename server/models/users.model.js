import { Schema, model } from 'mongoose'
import {
    nameValidator,
    usernameValidator,
    emailValidator,
    passwordValidator,
} from './validator.js'
import { generateAvatar } from '../helpers/generateAvatar.helper.js'
import crypto from 'crypto'

const generateUsername = (name) => {
    const nameLower = name.toLowerCase().replace(/ /g, '_')
    const username = nameLower + '@' + crypto.randomInt(1, 100000)
    return username
}

const userSchema = new Schema(
    {
        name: {
            type: Schema.Types.String,
            required: [true, 'Please enter your full name'],
            validate: nameValidator,
        },
        username: {
            type: Schema.Types.String,
            unique: true,
            validate: usernameValidator,
        },
        email: {
            type: Schema.Types.String,
            reuired: [true, 'Please enter an email'],
            unique: true,
            validate: emailValidator,
        },
        gender: {
            type: Schema.Types.String,
            default: '',
        },
        password: {
            type: Schema.Types.String,
            validate: passwordValidator,
        },
        avatar: {
            type: Schema.Types.String,
            default: '',
        },
        role: {
            type: Schema.Types.String,
            default: 'user',
        },
        providerId: {
            type: Schema.Types.String,
            default: '',
        },
        provider: {
            type: Schema.Types.String,
            default: '',
        },
    },
    { timestamps: true }
)

userSchema.pre('save', function (next) {
    if (!this.username) {
        this.username = generateUsername(this.name)
    }
    next()
})

userSchema.pre('save', function (next) {
    if (this.avatar === '') {
        try {
            this.avatar = generateAvatar(this.name)
            console.log('Avatar generated successfully', this.avatar)
        } catch (error) {
            console.error('Error generating avatar', error)
        }
    }
    next()
})

const User = model('User', userSchema)

export default User
