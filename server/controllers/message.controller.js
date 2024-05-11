import addPeople from "../helpers/addPeople.helper.js";
import { getPeopleToChat } from "../helpers/addPeopleToChat.helper.js";
import getCurrentChatPeople from "../helpers/getCurrentChatPeople.helper.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import AddedPeopleToChat from "../models/addedPeopleToChat.model.js";
import { addPeopleToChat } from "../helpers/addPeopleToChat.helper.js";
import User from "../models/users.model.js";
import { io, getReceiverSocketId } from "../helpers/socket.helper.js";
// const currentUserId from "../helpers/currentUserId.helper.js");

const messageController = async (req, res) => {
	const currentUserId = req.params.id;

	const currentUser = await User.findById(currentUserId);
	// console.log(currentUser);
	let unreadMesseges = [];

	try {
		const peopleToAdd = await addPeople(currentUserId);
		const currentUserAddedPeopleToChat = await getPeopleToChat(
			currentUserId
		);

		let currentChatPeople = [];
		if (currentUserAddedPeopleToChat) {
			currentChatPeople = await getCurrentChatPeople(
				currentUserAddedPeopleToChat.recivers
			);
		}

		const unreadMessagePromises = currentChatPeople.map(async (person) => {
			let findConversation = await Conversation.findOne({
				participants: { $all: [currentUserId, person._id] },
			});

			if (findConversation) {
				let findUnreadMsgCount = findConversation.unreadMsgCount.find(
					(obj) => obj.senderId.toString() === person._id.toString()
				);

				if (findUnreadMsgCount) {
					unreadMesseges.push(findUnreadMsgCount);
				} else {
					unreadMesseges.push({
						senderId: person._id,
						receiverId: currentUserId,
						unreadCount: 0,
					});
				}
			} else {
				unreadMesseges.push({
					senderId: person._id,
					receiverId: currentUserId,
					unreadCount: 0,
				});
			}
		});

		await Promise.all(unreadMessagePromises);

		// console.log("Unread Msg Count: ", unreadMesseges);

		return res.render("messages", {
			peopleToAdd,
			currentChatPeople,
			unreadMesseges,
			currentUser,
		});
	} catch (error) {
		console.log("Error getting people: ", error);
	}
};

const sendMessageController = async (req, res) => {
	const { senderId, receiverId, message } = req.body;

	try {
		const msg = new Message({
			senderId,
			receiverId,
			message,
		});

		const savedMsg = await msg.save();
		// console.log("Message saved: ", savedMsg);

		// Socket functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", savedMsg, senderId);
			console.log("Message sent to receiver", receiverSocketId);
		}

		res.status(201).send(savedMsg);
	} catch (error) {
		console.log("Error sending message: ", error.message);
		res.status(400).json({ messege: error.message });
	}
};

const deleteMessageController = async (req, res) => {
	const { senderId, receiverId, msgId } = req.body;
	// console.log("Message Id: ", msgId);
	try {
		const findMsg = await Message.findOne({
			_id: msgId,
		});
		if (findMsg) {
			try {
				const deleteMessage = await Message.findOne({
					_id: msgId,
				});

				if (deleteMessage) {
					let deleteRes = await deleteMessage.deleteOne();

					if (deleteRes.acknowledged === true) {
						// Socket functionality
						const receiverSocketId =
							getReceiverSocketId(receiverId);
						if (receiverSocketId) {
							io.to(receiverSocketId).emit(
								"deleteMessage",
								msgId
							);
							console.log(
								"Deleted Message Id sent to receiver",
								receiverSocketId
							);
						}
						return res
							.status(200)
							.json({ message: "Message deleted" });
					}
				} else {
					return res.json({ message: "Message not found" });
				}
				// await Conversation.updateOne(
				// 	{
				// 		participants: { $all: [senderId, receiverId] },
				// 	},
				// 	{
				// 		$pull: { messages: msgId },
				// 	}
				// );
				// console.log(deleteMessage);
			} catch (error) {
				console.log("Error deleting message: ", error.message);
				return res.json({ message: "Error deleting message" });
			}
		} else {
			return res.json({ message: "Message not found" });
		}
	} catch (error) {
		console.log("Error finding message: ", error.message);
		return res.json({ message: "Error finding message" });
	}
};

const unreadMessageController = async (req, res) => {
	const { senderId, receiverId, unreadMsgCount } = req.body;
	// console.log(senderId, receiverId, unreadMsgCount);
	try {
		let findConversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (findConversation) {
			let findUnreadMsgCount = findConversation.unreadMsgCount.find(
				(obj) => obj.senderId.toString() === senderId.toString()
			);

			// console.log("findUnreadMsgCount: ", findUnreadMsgCount);
			if (findUnreadMsgCount) {
				findUnreadMsgCount.unreadCount = unreadMsgCount;
			} else {
				findConversation.unreadMsgCount.push({
					senderId: senderId,
					receiverId: receiverId,
					unreadCount: unreadMsgCount,
				});
			}
			await findConversation.save();
		} else {
			let newConversation = new Conversation({
				participants: [senderId, receiverId],
				unreadMsgCount: [
					{
						senderId: senderId,
						receiverId: receiverId,
						unreadCount: unreadMsgCount,
					},
				],
			});
			await newConversation.save();
		}
		return res
			.status(200)
			.json({ message: "Unread message count updated" });
	} catch (error) {
		console.log("Error updating unread message count: ", error);
	}
};

const deleteConversationController = async (req, res) => {
	const { senderId, receiverId } = req.body;
	try {
		const findConversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (findConversation) {
			await findConversation.deleteOne();
		} else {
			console.log("Conversation not found");
		}

		// Delete the receiver from AddedPeopleToChat
		await AddedPeopleToChat.findOneAndUpdate(
			{
				senderId: senderId,
			},
			{
				$pull: { recivers: receiverId },
			},
			{ new: true }
		);

		// Delete the sender from AddedPeopleToChat
		await AddedPeopleToChat.findOneAndUpdate(
			{
				senderId: receiverId,
			},
			{
				$pull: { recivers: senderId },
			},
			{ new: true }
		);

		// Socket functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("deleteConversation", senderId);
			console.log(
				"Deleted Conversation sent to receiver",
				receiverSocketId
			);
		}
		return res.status(200).json({ message: "Conversation deleted" });
	} catch (error) {
		console.log("Error deleting conversation: ", error.message);
		return res.status(400).json({ message: "Error deleting conversation" });
	}
};

const blockUserController = async (req, res) => {
	const { senderId, receiverId } = req.body;
	try {
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (conversation) {
			conversation.isBlocked = true;
			conversation.blockedBy = senderId;
			await conversation.save();
		} else {
			let newConversation = new Conversation({
				participants: [senderId, receiverId],
				isBlocked: true,
			});
			await newConversation.save();
		}

		// Socket functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("blockUser", senderId);
			console.log("Blocked User sent to receiver", receiverSocketId);
		}

		return res.status(200).json({ message: "User blocked" });
	} catch (error) {
		console.log("Error blocking user: ", error.message);
		return res.status(400).json({ message: "Error blocking user" });
	}
};

const unblockUserController = async (req, res) => {
	const { senderId, receiverId } = req.body;
	// console.log("Unblock user: ", senderId, receiverId);
	try {
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (conversation) {
			// console.log("Id compare: ", conversation.blockedBy, senderId);
			if (conversation.blockedBy.toString() === senderId) {
				conversation.isBlocked = false;
				conversation.blockedBy = null;
				await conversation.save();

				// Socket functionality
				const receiverSocketId = getReceiverSocketId(receiverId);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("unblockUser", senderId);
					console.log(
						"Unblocked User sent to receiver",
						receiverSocketId
					);
				}
			} else {
				return res.status(400).json({
					message: "Conversation is not blocked by you",
				});
			}
		}
		// } else {
		// 	let newConversation = new Conversation({
		// 		participants: [senderId, receiverId],
		// 		isBlocked: false,
		// 	});
		// 	await newConversation.save();
		// }

		return res.status(200).json({ message: "User unblocked" });
	} catch (error) {
		console.log("Error unblocking user: ", error.message);
		return res.status(400).json({ message: "Error unblocking user" });
	}
};

export {
	messageController,
	sendMessageController,
	deleteMessageController,
	unreadMessageController,
	deleteConversationController,
	blockUserController,
	unblockUserController,
};
