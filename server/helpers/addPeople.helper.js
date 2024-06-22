import User from '../models/users.model.js'

const addPeople = async (currentUserId) => {
    try {
        console.log('current user id in addPeople: ', currentUserId)
        let people = (await User.find()).filter(
            (person) => person._id.toString() !== currentUserId.toString()
        )
        people = await User.find({ _id: { $in: people } })

        return people
    } catch (error) {
        console.log('Error getting people for adding: ', error.message)
        return []
    }
}

export default addPeople
