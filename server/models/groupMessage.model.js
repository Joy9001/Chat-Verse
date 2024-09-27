import { Schema, model } from 'mongoose'
import { Conversation } from './conversation.model.js'

const groupMessageSchema = new Schema(
	{
		groupId: {
			type: Schema.Types.ObjectId,
			ref: 'Conversation',
			required: [true, 'groupId is required'],
		},
		senderId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'senderId is required'],
		},
		message: {
			type: Schema.Types.String,
			required: [true, 'message is required'],
		},
	},
	{ timestamps: true }
)

// Pre Hooks
groupMessageSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
	try {
		let conversation = await Conversation.findOne({ _id: this.groupId, isGroup: true })

		if (!conversation) {
			console.log('Conversation not found in group message delete hook')
			next(new Error('Conversation not found in group message delete hook'))
		}

		conversation.messages = conversation.messages.filter((message) => message.toString() !== this._id.toString())

		await conversation.save()
		next()
	} catch (error) {
		console.log('Error deleting group message: ', error.message)
		next(error)
	}
})

// Post hooks
groupMessageSchema.post('save', async function (doc, next) {
	try {
		// Find or create a conversation
		let conversation = await Conversation.findOne({
			_id: doc.groupId,
			participants: { $all: [doc.senderId] },
			isGroup: true,
		})

		// console.log('conversation: ', conversation)
		if (!conversation) {
			console.log('Conversation not found in group message save hook')
			next(new Error('Conversation not found in group message save hook'))
		}

		conversation.messages.push(doc._id)
		await conversation.save()
	} catch (error) {
		console.log('Error saving group message: ', error.message)
		next(error)
	}
})

groupMessageSchema.post('save', function (error, doc, next) {
	if (error) {
		console.log('Error saving group message: ', error.message)
		next(error)
	} else {
		next()
	}
})

const GroupMessage = model('GroupMessage', groupMessageSchema)

export default GroupMessage
