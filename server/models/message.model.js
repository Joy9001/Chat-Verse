import { Schema, model } from "mongoose";
import User from "./users.model.js";
import Conversation from "./conversation.model.js";

const messageSchema = new Schema(
	{
		senderId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "senderId is required"],
		},
		receiverId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "receiverId is required"],
		},
		message: {
			type: Schema.Types.String,
			required: [true, "message is required"],
		},
	},
	{ timestamps: true }
);

// Pre Hooks
messageSchema.pre(
	"deleteOne",
	{ document: true, query: false },
	async function (next) {
		await Conversation.findOneAndUpdate(
			{
				participants: { $all: [this.senderId, this.receiverId] },
			},
			{ $pull: { messages: this._id } }
		)
			.then(() => next())
			.catch((error) => {
				console.log("Error deleting message: ", error.message);
				next(error);
			});
	}
);

// Post hooks
messageSchema.post("save", async function (doc, next) {
	try {
		// Find or create a conversation
		let conversation = await Conversation.findOne({
			participants: { $all: [doc.senderId, doc.receiverId] },
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [doc.senderId, doc.receiverId],
				messages: [],
				isBlocked: false,
				unreadMsgCount: {
					senderId: doc.senderId,
					receiverId: doc.receiverId,
					unreadCount: 1,
				},
			});
		}
		// If user is not blocked, save the message
		if (!conversation.isBlocked) {
			conversation.messages.push(doc._id);
			await conversation
				.save()
				.then(() => {
					console.log("Conversation saved successfully");
					next();
				})
				.catch((error) => {
					console.log("Error saving conversation: ", error.message);
					next(error);
				});
		} else {
			console.log("User is blocked");
			next(new Error("User is blocked"));
		}
	} catch (error) {
		console.log("Error saving message: ", error.message);
		next(error);
	}
});

messageSchema.post("save", async function (doc, next) {
	// Add the sender to receiver's chat
	try {
		const addRes = await addPeopleToChat(doc.receiverId, doc.senderId);
		// if (addRes === "Already exists in the chat") {
		// 	console.log("Already exists in the chat");
		// }
		next();
	} catch (error) {
		console.log("Error adding people to chat: ", error.message);
		next(error);
	}
});

messageSchema.post("save", function (error, doc, next) {
	if (error) {
		console.log("Error saving message: ", error.message);
		next(error);
	} else {
		next();
	}
});

const Message = model("Message", messageSchema);

export default Message;
