import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_DB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

const connectMongo = async () => {
	try {
		await client.connect();

		await client.db("chat-app-db").command({ ping: 1 });
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB: ", error.message);
	} finally {
		await client.close();
	}
};

export default connectMongo;
