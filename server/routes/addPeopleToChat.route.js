import { Router } from "express";
import { Types } from "mongoose";
const router = Router();
import { addPeopleToChat } from "../helpers/addPeopleToChat.helper.js";
import User from "../models/users.model.js";

router.post("/", async (req, res) => {
	try {
		// console.log(req.body);
		const { senderId, receiverId } = req.body;
		const receiverObjectid = new Types.ObjectId(`${receiverId}`);
		const result = await addPeopleToChat(senderId, receiverId);
		const findReceiver = await User.findOne({
			_id: receiverObjectid,
		});
		// console.log(`findReceiver: ${findReceiver}`);
		if (result === "Already exists in the chat") {
			return res.json({
				message: "Already exists in the chat",
			});
		} else if (result === "Error adding people to chat") {
			return res
				.status(404)
				.json({ message: "Error adding people to chat" });
		}
		res.json({ message: "Added people to chat", newPeople: findReceiver });
	} catch (error) {
		console.log(
			"Error adding people to chat inside addedPeopleToChat.route: ",
			error.message
		);
		return res.status(500).json({ message: "Internal server error" });
	}
});

export default router;
