import Message from "../models/message.model.js";

const getConversation = async (messages) => {
	// console.log("Messages inside getConversation: ", messages);
	try {
		const promises = messages.map(async (message) => {
			const findMessage = await Message.findOne({ _id: message._id });
			return findMessage;
		});

		const conversation = await Promise.all(promises);
		// console.log(conversation);
		return conversation;
	} catch (error) {
		console.log(
			"Error getting conversation inside getConversation: ",
			error.message
		);
	}
};

export default getConversation;
