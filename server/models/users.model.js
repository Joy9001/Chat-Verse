import { Schema, model } from 'mongoose'
import { nameValidator, usernameValidator, emailValidator, passwordValidator } from './validator.js'
import { generateAvatar } from '../helpers/generateAvatar.helper.js'
import crypto from 'crypto'
import { encryptWithCryptoJS } from '../helpers/crypto.helper.js'

const generateUsername = (name) => {
    const nameLower = name.toLowerCase().replace(/ /g, '_')
    const username = nameLower + '@' + crypto.randomInt(1, 100000)
    return username
}

const userSchema = new Schema(
    {
        encryptedId: {
            type: Schema.Types.String,
            default: '',
        },
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
    try {
        if (!this.username) {
            this.username = generateUsername(this.name)
        }
        next()
    } catch (error) {
        console.error('Error in pre-save hook:', error)
        next(error)
    }
})

userSchema.pre('save', function (next) {
    try {
        if (this.avatar === '') {
            this.avatar = generateAvatar(this.name)
            console.log('Avatar generated successfully...')
        }
        next()
    } catch (error) {
        console.error('Error generating avatar', error)
        next(error)
    }
})

userSchema.post('save', async function (doc, next) {
    // console.log('doc:', doc)
    try {
        if (doc.encryptedId === '') {
            doc.encryptedId = encryptWithCryptoJS(doc._id.toString())
            await doc.save()
            console.log('EncryptedId saved successfully...')
        }
        next()
    } catch (error) {
        console.error('Error saving encryptedId: ', error)
        next(error)
    }
})

const User = model('User', userSchema)

export default User
