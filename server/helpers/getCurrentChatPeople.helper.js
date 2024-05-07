import User from "../models/users.model.js";

const getCurrentChatPeople = async (Receivers) => {
	try {
		const promises = Receivers.map(async (receiver) => {
			const findReceiver = await User.findOne({ _id: receiver });
			return findReceiver;
		});

		const currentChatPeople = await Promise.all(promises);
		return currentChatPeople;
	} catch (error) {
		console.log(
			"Error getting people inside getCurrentChatPeople: ",
			error.message
		);
	}
};

export default getCurrentChatPeople;
