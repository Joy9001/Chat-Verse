import { Conversation } from '../models/conversation.model.js'
import User from '../models/users.model.js'
import redisClient from './redisClient.helper.js'

const getCurrentChatPeople = async (receivers) => {
	try {
		const promises = receivers.map(async (receiver) => {
			const cachedReceiver = await redisClient.get(`user:${receiver}`)
			if (cachedReceiver) {
				return JSON.parse(cachedReceiver)
			}

			const findReceiver = await User.findOne(
				{ _id: receiver },
				{
					password: 0,
					__v: 0,
					updatedAt: 0,
					createdAt: 0,
				}
			).lean()

			if (findReceiver) {
				await redisClient.set(`user:${receiver}`, JSON.stringify(findReceiver))
			}

			return findReceiver
		})

		const currentChatPeople = await Promise.all(promises)
		return currentChatPeople
	} catch (error) {
		console.log('Error getting people inside getCurrentChatPeople: ', error.message)
	}
}

const getCurrentGroups = async (groups) => {
	try {
		const promises = groups.map(async (groupId) => {
			const findGroup = await Conversation.findOne(
				{ _id: groupId, isGroup: true },
				{
					isBlocked: 0,
					blockedBy: 0,
					__v: 0,
				}
			).lean()
			return findGroup
		})

		let currentGroups = await Promise.all(promises)
		currentGroups = currentGroups.filter((group) => group !== null)

		return currentGroups
	} catch (error) {
		console.log('Error getting groups inside getCurrentGroups: ', error.message)
	}
}

export { getCurrentChatPeople, getCurrentGroups }
