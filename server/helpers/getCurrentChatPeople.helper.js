const { User } = require("../models/users.model");

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

module.exports = { getCurrentChatPeople };
