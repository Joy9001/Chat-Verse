import { Schema, model } from "mongoose";
import User from "./users.model.js";

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

const AddedPeopleToChat = model("AddedPeopleToChat", addedPeopleToChatSchema);

export default AddedPeopleToChat;
