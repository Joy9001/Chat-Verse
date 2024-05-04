const { User } = require("../models/users.model");
const Follower = require("../models/follower.model");
// const currentUserId = require("./currentUserId.helper.js");

const addPeople = async (currentUserId) => {
	try {
		// const people = (await User.find()).filter(
		// 	(person) => person._id.toString() !== currentUserId
		// );

		const findCurrentUser = await Follower.findOne({
			userId: currentUserId,
		});

		// console.log("Find Current User: ", findCurrentUser);

		const followers = findCurrentUser.followers;
		const following = findCurrentUser.following;

		let people = new Set();
		for (let i = 0; i < followers.length; i++) {
			people.add(followers[i].toString());
		}
		for (let i = 0; i < following.length; i++) {
			people.add(following[i].toString());
		}

		people = Array.from(people);

		// console.log("People: ", people);

		people = await User.find({ _id: { $in: people } });

		return people;
	} catch (error) {
		console.log("Error getting people for adding: ", error.message);
		return [];
	}
};

module.exports = addPeople;
