import { Router } from "express";
const router = Router();
import Conversation from "../models/conversation.model.js";
import getConversation from "../helpers/getConversation.helper.js";

router.post("/get-conversation", async (req, res) => {
	const { senderId, receiverId } = req.body;
	// console.log(senderId, receiverId);

	try {
		const findConversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});
		// console.log("findConversation", findConversation);
		if (findConversation) {
			if (findConversation.messages.length === 0) {
				return res.status(200).json({
					messages: [],
					isBlocked: findConversation.isBlocked,
					blockedBy: findConversation.blockedBy,
				});
			} else {
				try {
					findConversation.unreadMsgCount.forEach((obj) => {
						if (obj.senderId.toString() === receiverId.toString()) {
							// console.log("obj unreadCount", obj.unreadCount);
							obj.unreadCount = 0;
						}
					});
					await findConversation.save();
					const conversation = await getConversation(
						findConversation.messages
					);

					return res.status(200).json({
						messages: conversation,
						isBlocked: findConversation.isBlocked,
						blockedBy: findConversation.blockedBy,
					});
				} catch (error) {
					console.log("Error getting conversation: ", error.message);
				}
			}
		} else {
			return res
				.status(200)
				.json({ messages: [], isBlocked: false, blockedBy: null });
		}
	} catch (error) {
		console.log("Error getting conversation: ", error.message);
	}
});

export default router;
