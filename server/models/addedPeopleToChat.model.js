const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("./users.model.js");

const addedPeopleToChatSchema = new Schema({
	senderId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "senderId is required"],
	},

	recivers: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "recivers are required"],
		},
	],
});

const AddedPeopleToChat = mongoose.model(
	"AddedPeopleToChat",
	addedPeopleToChatSchema
);

module.exports = AddedPeopleToChat;
