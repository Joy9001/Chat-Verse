import { Schema, model } from 'mongoose';
import GroupMessage from './groupMessage.model.js';
import Message from './message.model.js';

const unreadMsgCountSchema = new Schema({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'senderId is required'],
	},
	receivers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'receiverId is required'],
		},
	],
	unreadCount: {
		type: Number,
		required: [true, 'unreadCount is required'],
		default: 0,
	},
});

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
		isGroup: {
			type: Schema.Types.Boolean,
			default: false,
		},
		groupId: {
			type: Schema.Types.String,
			default: '',
		},
		groupName: {
			type: Schema.Types.String,
			default: '',
		},
		groupDescription: {
			type: Schema.Types.String,
			default: '',
		},
		groupAvatar: {
			type: Schema.Types.String,
			default: '',
		},
		unreadMsgCount: [unreadMsgCountSchema],
	},
	{ timestamps: true }
);

// Pre Hooks
conversationSchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		try {
			// console.log('Deleting conversation', this)
			if (this.isGroup) {
				// console.log('Deleting group messages...')
				await GroupMessage.deleteMany({ _id: { $in: this.messages } });
			} else {
				// console.log('Deleting messages...')
				await Message.deleteMany({ _id: { $in: this.messages } });
			}
		} catch (error) {
			console.log('Error deleting conversation: ', error.message);
			next(error);
		}
	}
);

conversationSchema.post('save', async function (doc, next) {
	try {
		if (doc.isGroup && !doc.groupId) {
			// Use MongoDB ID directly instead of encrypting
			await doc.updateOne({ groupId: doc._id.toString() });
			console.log('GroupId saved successfully');
		} else {
			console.log("GroupId already saved or it's not a group");
		}
		next();
	} catch (error) {
		console.error('Error saving groupId: ', error);
		next(error);
	}
});

const Conversation = model('Conversation', conversationSchema);
// const UnreadMsgCount = model('UnreadMsgCount', unreadMsgCountSchema)

export { Conversation };
