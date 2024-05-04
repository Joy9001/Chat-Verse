const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { addPeopleToChat } = require("../helpers/addPeopleToChat.helper.js");
const { User } = require("../models/users.model");

router.post("/add-people-to-chat", async (req, res) => {
	try {
		// console.log(req.body);
		const { senderId, receiverId } = req.body;
		const receiverObjectid = new mongoose.Types.ObjectId(`${receiverId}`);
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
		console.log("Error adding people to chat: ", error.message);
		return res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = router;
