import { Router } from 'express'
import { Types } from 'mongoose'
import { addPeopleToChat } from '../helpers/addPeopleToChat.helper.js'
import { decryptWithCryptoJS } from '../helpers/crypto.helper.js'
import redisClient from '../helpers/redisClient.helper.js'
import User from '../models/users.model.js'
import { userSockets } from '../server.js'
const router = Router()

router.post('/add-people-to-chat', async (req, res) => {
	try {
		// console.log(req.body);
		const senderId = req.user._id
		let { receiverId } = req.body
		receiverId = decryptWithCryptoJS(receiverId)
		const receiverObjectid = new Types.ObjectId(`${receiverId}`)
		const result = await addPeopleToChat(senderId, receiverId)

		let findReceiver = await redisClient.get(`user:${receiverId}`)
		if (!findReceiver) {
			findReceiver = await User.findOne(
				{ _id: receiverObjectid },
				{
					password: 0,
					__v: 0,
					updatedAt: 0,
					createdAt: 0,
				}
			).lean()
			await redisClient.set(`user:${receiverId}`, JSON.stringify(findReceiver))
		} else {
			findReceiver = JSON.parse(findReceiver)
		}

		// console.log(`findReceiver: ${findReceiver}`);
		if (result === 'Already exists in the chat') {
			return res.json({
				message: 'Already exists in the chat',
			})
		} else if (result === 'Error adding people to chat') {
			return res.status(404).json({ message: 'Error adding people to chat' })
		}

		// check if the receiver is online
		let isOnline = false
		if (userSockets[receiverId.toString()]) {
			isOnline = true
		}

		findReceiver = {
			...findReceiver,
			isOnline: isOnline,
		}
		return res.json({ message: 'Added people to chat', newPerson: findReceiver })
	} catch (error) {
		console.log('Error adding people to chat inside addedPeopleToChat.route: ', error.message)
		return res.status(500).json({ message: 'Internal server error' })
	}
})

export default router
