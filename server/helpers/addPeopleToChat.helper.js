import AddedPeopleToChat from '../models/addedPeopleToChat.model.js';

const addPeopleToChat = async (senderId, receiverId, next) => {
	try {
		// console.log("inside addPeopleToChat: ", senderId);
		const findSender = await AddedPeopleToChat.findOne({
			senderId: senderId,
		});

		if (findSender) {
			if (
				findSender.receivers.some(
					(receiver) => receiver.toString() === receiverId.toString()
				)
			) {
				return 'Already exists in the chat';
			}

			findSender.receivers.push(receiverId);
			await findSender.save();
		} else {
			const addedpeople = new AddedPeopleToChat({
				senderId,
				receivers: [receiverId],
			});

			await addedpeople.save();
		}
		return 'Added people to chat';
	} catch (err) {
		console.error(
			'Error adding people to chat inside addedPeopleToChat.helper: ',
			err.message
		);
		next(err);
	}
};

const getPeopleToChat = async (senderId) => {
	try {
		const people = await AddedPeopleToChat.findOne({
			senderId: senderId,
		}).lean();
		return people;
	} catch (error) {
		console.log('Error getting people: ', error.message);
		return [];
	}
};

export { addPeopleToChat, getPeopleToChat };
