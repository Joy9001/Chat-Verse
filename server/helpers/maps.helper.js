import { Conversation } from '../models/conversation.model.js'
import User from '../models/users.model.js'

const getUserMap = async () => {
    try {
        let allUsers = await User.find(
            {},
            {
                _id: 1,
                encryptedId: 1,
                name: 1,
            }
        )

        let userMap = {}
        allUsers.forEach((user) => {
            userMap[user._id] = {
                encryptedId: user.encryptedId,
                name: user.name,
            }
        })

        return userMap
    } catch (error) {
        console.log('Error getting user map: ', error.message)
        return {}
    }
}

const getGroupConversationMap = async () => {
    try {
        let allConv = await Conversation.find(
            {
                isGroup: true,
            },
            {
                _id: 1,
                groupId: 1,
            }
        )

        let convMap = {}
        allConv.forEach((conv) => {
            convMap[conv._id] = conv.groupId
        })

        return convMap
    } catch (error) {
        console.log('Error getting conversation map: ', error.message)
        return {}
    }
}

export { getUserMap, getGroupConversationMap }
