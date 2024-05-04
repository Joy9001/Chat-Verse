const { User } = require("../models/users.model");
const searchPeopleController = async (req, res) => {
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
	};

	try {
		const people = await User.find(query).select(projection);

		return res.json({ people });
	} catch (error) {
		console.log("Error searching people: ", error.message);
		return res.json({ message: "Error searching people" });
	}
};

module.exports = { searchPeopleController };
