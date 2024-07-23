import { Schema, model } from 'mongoose'
import { Conversation } from './conversation.model.js'
import { addPeopleToChat } from '../helpers/addPeopleToChat.helper.js'
import AddedPeopleToChat from './addedPeopleToChat.model.js'

const messageSchema = new Schema(
    {
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
        message: {
            type: Schema.Types.String,
            required: [true, 'message is required'],
        },
    },
    { timestamps: true }
)

// Pre Hooks
messageSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [this.senderId, this.receiverId] },
            isGroup: false,
        })

        if (!conversation) {
            console.log('Conversation not found')
            next(new Error('Conversation not found'))
        }

        conversation.messages = conversation.messages.filter((message) => message.toString() !== this._id.toString())

        // console.log('conversation in msgSchema: ', conversation)

        if (conversation.messages.length === 0) {
            console.log('Deleting conversation...')
            await Conversation.deleteOne({ _id: conversation._id, isGroup: false })

            // Delete the added people to chat
            console.log('Deleting added people to chat...')
            await AddedPeopleToChat.findOneAndUpdate(
                {
                    senderId: this.senderId,
                },
                {
                    $pull: { recivers: this.receiverId },
                }
            )

            // Delete the sender from AddedPeopleToChat
            console.log('Deleting sender from added people to chat...')
            await AddedPeopleToChat.findOneAndUpdate(
                {
                    senderId: this.receiverId,
                },
                {
                    $pull: { recivers: this.senderId },
                }
            )
        } else {
            console.log('Saving conversation...')
            await conversation.save()
        }
        next()
    } catch (error) {
        console.log('Error deleting message: ', error.message)
        next(error)
    }
})

// Post hooks
messageSchema.post('save', async function (doc, next) {
    try {
        // console.log('doc in message.model: ', doc)
        // Find or create a conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [doc.senderId, doc.receiverId] },
            isGroup: false,
        })

        if (!conversation) {
            conversation = new Conversation({
                participants: [doc.senderId, doc.receiverId],
                messages: [],
                isBlocked: false,
                unreadMsgCount: {
                    senderId: doc.senderId,
                    receivers: [doc.receiverId],
                    unreadCount: 0,
                },
            })
        }
        // If user is not blocked, save the message
        if (!conversation.isBlocked) {
            conversation.messages.push(doc._id)
            await conversation
                .save()
                .then(() => {
                    console.log('Conversation saved successfully')
                    next()
                })
                .catch((error) => {
                    console.log('Error saving conversation: ', error.message)
                    next(error)
                })
        } else {
            console.log('User is blocked')
            next(new Error('User is blocked'))
        }
    } catch (error) {
        console.log('Error saving message: ', error.message)
        next(error)
    }
})

messageSchema.post('save', async function (doc, next) {
    // Add the sender to receiver's chat
    try {
        const addRes = await addPeopleToChat(doc.receiverId, doc.senderId)
        if (addRes === 'Already exists in the chat') {
            console.log('Already exists in the chat')
        } else {
            console.log('Added people to chat')
        }
        next()
    } catch (error) {
        console.log('Error adding people to chat inside message.model: ', error.message)
        next(error)
    }
})

messageSchema.post('save', function (error, doc, next) {
    if (error) {
        console.log('Error saving message: ', error.message)
        next(error)
    } else {
        next()
    }
})

const Message = model('Message', messageSchema)

export default Message
