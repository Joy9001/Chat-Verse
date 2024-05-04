const mongoose = require("mongoose");

const connectMongo = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI).then(() => {
			mongoose.connection.on("connected", () => {
				console.log("Connected to MongoDB");
			});
		});

		mongoose.connection.on("error", (error) => {
			console.log("Error connecting to MongoDB: ", error.message);
		});

		mongoose.connection.on("disconnected", () => {
			console.log("Disconnected from MongoDB");
		});
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error.message);
	}
};

module.exports = connectMongo;
