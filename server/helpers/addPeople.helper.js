import User from '../models/users.model.js'
import { encryptWithCryptoJS } from './crypto.helper.js'

const addPeople = async (currentUserId) => {
    try {
        console.log('current user id in addPeople: ', currentUserId)
        let people = (
            await User.find(
                {},
                {
                    _id: 1,
                    name: 1,
                    username: 1,
                    avatar: 1,
                }
            )
        ).filter((person) => person._id.toString() !== currentUserId.toString())

        people = people.map((person) => {
            return {
                _id: encryptWithCryptoJS(person._id.toString()),
                name: person.name,
                username: person.username,
                avatar: person.avatar,
            }
        })

        return people
    } catch (error) {
        console.log('Error getting people for adding: ', error.message)
        return []
    }
}

export default addPeople
