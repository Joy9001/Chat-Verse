import User from '../models/users.model.js'
import { Conversation } from '../models/conversation.model.js'

const getCurrentChatPeople = async (receivers) => {
    try {
        const promises = receivers.map(async (receiver) => {
            const findReceiver = await User.findOne(
                { _id: receiver },
                {
                    _id: 1,
                    encryptedId: 1,
                    name: 1,
                    username: 1,
                    avatar: 1,
                }
            ).lean()
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
