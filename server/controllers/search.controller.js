const { User } = require("../models/users.model");
const Follower = require("../models/follower.model");
const searchController = async (req, res) => {
	const { queryText } = req.body;

	const query = {
		$or: [
			{ fullName: { $regex: queryText, $options: "i" } },
			{ username: { $regex: queryText, $options: "i" } },
		],
	};

	const projection = {
		_id: 1,
		fullName: 1,
		username: 1,
		profilePic: 1,
	};

	try {
		const people = await User.find(query).select(projection);

		const followerPromises = people.map(async (person) => {
			const follower = await Follower.findOne({ userId: person._id });
			return follower;
		});

		let followers = await Promise.all(followerPromises);

		followers = followers.filter((follower) => follower !== null);
		console.log("followers: ", followers);
		console.log("followers: ", followers.length);
		console.log("persons: ", people.length);

		let peopleWithFollowers = people.map((person, index) => {
			if (!followers[index]) {
				return {
					_id: person._id,
					fullName: person.fullName,
					username: person.username,
					followers: 0,
					followings: 0,
				};
			}
			return {
				_id: person._id,
				fullName: person.fullName,
				profilePic: person.profilePic,
				username: person.username,
				followers: followers[index].followerCount,
				followings: followers[index].followingCount,
			};
		});

		return res.json({ people: peopleWithFollowers });
	} catch (error) {
		console.log("Error searching people: ", error.message);
		return res.json({ message: "Error searching people" });
	}
};

module.exports = { searchController };
