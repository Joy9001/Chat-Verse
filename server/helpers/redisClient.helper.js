import dotenv from 'dotenv'
import { createClient } from 'redis'
dotenv.config()

const redisClient = createClient({
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	},
})

redisClient.on('error', (error) => {
	console.error(error)
})

redisClient.on('connect', () => {
	console.log('Connected to Redis')
})

redisClient.on('close', () => {
	console.log('Redis connection closed')
})

await redisClient.connect()

export default redisClient
