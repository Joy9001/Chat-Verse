import mongoose from 'mongoose'

const connectMongo = async () => {
	try {
		mongoose.connection.on('connected', () => {
			console.log('Connected to MongoDB')
		})

		mongoose.connection.on('error', (error) => {
			console.log('Error connecting to MongoDB: ', error.message)
		})

		mongoose.connection.on('disconnected', () => {
			console.log('Disconnected from MongoDB')
		})

		await mongoose.connect(process.env.MONGO_DB_URI)
	} catch (error) {
		console.log('Error connecting to MongoDB: ', error.message)
	}
}

export default connectMongo
