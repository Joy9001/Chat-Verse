import { Schema, model } from 'mongoose'

const authSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        refreshToken: {
            type: Schema.Types.String,
            required: true,
        },
    },
    { timestamps: true }
)

const Auth = model('Auth', authSchema)

export default Auth
