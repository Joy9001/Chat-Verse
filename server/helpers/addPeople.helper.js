import User from '../models/users.model.js'

const addPeople = async (currentUserId) => {
	try {
		console.log('current user id in addPeople: ', currentUserId)
		let people = (
			await User.find(
				{},
				{
					_id: 1,
					encryptedId: 1,
					name: 1,
					username: 1,
					avatar: 1,
				}
			).lean()
		).filter((person) => person._id.toString() !== currentUserId.toString())

		return people
	} catch (error) {
		console.log('Error getting people for adding: ', error.message)
		return []
	}
}

export default addPeople
