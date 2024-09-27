import { userSockets } from '../server.js'

const getReceiverSocketId = (receiverId) => {
	return userSockets[receiverId]
}

const onlyForHandshake = (middleware) => {
	return (req, res, next) => {
		const isHandshake = req._query.sid === undefined
		if (isHandshake) {
			middleware(req, res, next)
		} else {
			next()
		}
	}
}

export { getReceiverSocketId, onlyForHandshake }
