const { User } = require("../models/users.model");
// const currentUserId = require("./currentUserId.helper.js");

const addPeople = async (currentUserId) => {
	try {
		const people = (await User.find()).filter(
			(person) => person._id.toString() !== currentUserId
		);
		// console.log("People: ", people);
		people = await User.find({ _id: { $in: people } });

		return people;
	} catch (error) {
		console.log("Error getting people for adding: ", error.message);
		return [];
	}
};

module.exports = addPeople;
