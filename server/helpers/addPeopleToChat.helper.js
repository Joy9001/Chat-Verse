const AddedPeopleToChat = require("../models/addedPeopleToChat.model");
// const user = require("../models/users.model");

const addPeopleToChat = async (senderId, receiverId, next) => {
	try {
		// console.log("inside addPeopleToChat: ", senderId);
		const findSender = await AddedPeopleToChat.findOne({
			senderId: senderId,
		});

		if (findSender) {
			if (findSender.recivers.includes(receiverId)) {
				return "Already exists in the chat";
			}

			findSender.recivers.push(receiverId);
			await findSender.save();
		} else {
			const addedpeople = new AddedPeopleToChat({
				senderId,
				recivers: [receiverId],
			});

			await addedpeople.save();
		}
		return "Added people to chat";
	} catch (err) {
		console.log("Error adding people to chat: ", err.message);
		next(err);
	}
};

const getPeopleToChat = async (senderId) => {
	try {
		const people = await AddedPeopleToChat.findOne({
			senderId: senderId,
		});
		return people;
	} catch (error) {
		console.log("Error getting people: ", error.message);
		return [];
	}
};

module.exports = { addPeopleToChat, getPeopleToChat };
