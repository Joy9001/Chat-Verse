import User from "../models/users.model.js";

const searchPeopleController = async (req, res) => {
	const { queryText } = req.body;

	const query = {
		$or: [
			{ name: { $regex: queryText, $options: "i" } },
			{ username: { $regex: queryText, $options: "i" } },
		],
	};

	const projection = {
		_id: 1,
		name: 1,
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

export default searchPeopleController;
