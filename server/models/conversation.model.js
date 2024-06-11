import { Schema, model } from 'mongoose'
import Message from './message.model.js'

const unreadMsgCountSchema = new Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'senderId is required'],
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'receiverId is required'],
    },
    unreadCount: {
        type: Number,
        required: [true, 'unreadCount is required'],
        default: 0,
    },
})

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'participants are required'],
            },
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message',
                default: [],
            },
        ],
        isBlocked: {
            type: Schema.Types.Boolean,
            default: false,
        },
        blockedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        unreadMsgCount: [unreadMsgCountSchema],
    },
    { timestamps: true }
)

// Pre Hooks
conversationSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        await Message.deleteMany({ _id: { $in: this.messages } })
    } catch (error) {
        console.log('Error deleting conversation: ', error.message)
        next(error)
    }
})

const Conversation = model('Conversation', conversationSchema)

export default Conversation
