import { Schema, model } from 'mongoose'

const addedPeopleToChatSchema = new Schema({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'senderId is required'],
	},

	recivers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
			default: [],
		},
	],

	groups: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Conversation',
			default: [],
		},
	],
})

const AddedPeopleToChat = model('AddedPeopleToChat', addedPeopleToChatSchema)

export default AddedPeopleToChat
