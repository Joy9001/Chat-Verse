import { csrfSync } from 'csrf-sync';
import addPeople from '../helpers/addPeople.helper.js';
import { getPeopleToChat } from '../helpers/addPeopleToChat.helper.js';
import { updateUnreadCount } from '../helpers/conversation.helper.js';
import {
	getCurrentChatPeople,
	getCurrentGroups,
} from '../helpers/getCurrentChats.helper.js';
import { getReceiverSocketId } from '../helpers/socket.helper.js';
import AddedPeopleToChat from '../models/addedPeopleToChat.model.js';
import { Conversation } from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import User from '../models/users.model.js';
import { io } from '../server.js';

// csrf sync
const { generateToken } = csrfSync();

const messageController = async (req, res) => {
	try {
		const currentUserId = req.user._id;

		// Get current user
		const currentUser = await User.findById(currentUserId, {
			name: 1,
			username: 1,
			avatar: 1,
			gender: 1,
		}).lean();
		if (!currentUser)
			return res.status(404).json({ message: 'User not found' });

		// Get people to add
		const peopleToAdd = await addPeople(currentUserId);
		const currentUserAddedPeopleToChat = await getPeopleToChat(currentUserId);

		// Get current chat people
		let currentChatPeople = [];
		if (currentUserAddedPeopleToChat) {
			currentChatPeople = await getCurrentChatPeople(
				currentUserAddedPeopleToChat.recivers
			);
		}

		// Get unread messages
		let unreadMessages = [];
		const unreadMessagePromises = currentChatPeople.map(async (person) => {
			let findConversation = await Conversation.findOne({
				participants: { $all: [currentUserId, person._id] },
				isGroup: false,
			}).lean();

			// console.log('findConversation: ', findConversation)
			if (findConversation) {
				let findUnreadMsgCount = findConversation.unreadMsgCount.find(
					(obj) => obj.senderId.toString() === person._id.toString()
				);

				if (findUnreadMsgCount) {
					unreadMessages.push(findUnreadMsgCount);
				} else {
					unreadMessages.push({
						senderId: person._id,
						receivers: [currentUserId],
						unreadCount: 0,
					});
				}
			} else {
				unreadMessages.push({
					senderId: person._id,
					receivers: [currentUserId],
					unreadCount: 0,
				});
			}
		});

		await Promise.all(unreadMessagePromises);

		// Determine the total unread messages for each user
		currentChatPeople = currentChatPeople.map((person) => {
			let unreadMsg = unreadMessages.find(
				(msg) =>
					msg.senderId.toString() === person._id.toString() &&
					msg.receivers.some(
						(receiver) => receiver.toString() === currentUserId.toString()
					)
			);
			let totalUnreadMsgCount = 0;
			if (unreadMsg) {
				totalUnreadMsgCount = unreadMsg.unreadCount;
			}
			return {
				...person,
				totalUnreadMsgCount,
				unreadMsg,
			};
		});
		// console.log('currentChatPeople: ', currentChatPeople)

		// Get Group Chats
		let currentGroups = await AddedPeopleToChat.findOne(
			{
				senderId: currentUserId,
			},
			{ groups: 1 }
		).lean();

		if (currentGroups) {
			currentGroups = await getCurrentGroups(currentGroups.groups);

			// console.log('currentGroups: ', currentGroups)
			if (currentGroups) {
				// Get unread message count for group chats
				currentGroups = currentGroups.map((group) => {
					// console.log('group: ', group)
					let unreadGroupMsgs = group.unreadMsgCount.filter((msg) =>
						msg.receivers.some(
							(receiver) => receiver.toString() === currentUserId.toString()
						)
					);
					let unreadMsgCount = 0;
					if (unreadGroupMsgs) {
						unreadGroupMsgs.forEach((msg) => {
							unreadMsgCount += msg.unreadCount;
						});
					}
					return {
						...group,
						totalUnreadMsgCount: unreadMsgCount,
					};
				});
			}
		}

		// console.log('currentGroups: ', currentGroups)

		// Refresh the access token if expired
		if (req.user.accessToken) {
			// console.log('Set the accessToken in cookie inside messageController', req.user.accessToken)
			res.cookie('accessToken', req.user.accessToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 1000 * 30, // 30 seconds
			});
		}

		// CSRF Token
		const csrfToken = generateToken(req);

		const responseData = {
			peopleToAdd,
			currentChatPeople,
			unreadMessages,
			currentGroups,
			currentUser,
			csrfToken,
		};

		// Return JSON response instead of rendering EJS template
		return res.status(200).json(responseData);
	} catch (error) {
		console.log('Error getting people inside messageController: ', error);
		return res
			.status(500)
			.json({ error: 'Internal server error', details: error.message });
	}
};

const sendMessageController = async (req, res) => {
	const senderId = req.user._id;
	let { receiverId, message } = req.body;
	// Use receiverId directly without decryption
	// console.log('receiverId', receiverId)

	try {
		const msg = new Message({
			senderId,
			receiverId,
			message,
		});

		await msg.save();
		let senderUsername = await User.findOne(
			{ _id: senderId },
			{ _id: 0, username: 1 }
		).lean();

		// Socket functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		// console.log('receiverSocketId: ', receiverSocketId)
		if (receiverSocketId) {
			io.to(receiverSocketId)
				.timeout(2000)
				.emit(
					'newMessage',
					msg,
					senderUsername.username,
					async (err, responses) => {
						// console.log('response: ', responses)
						if (err) {
							console.log('Error sending message to receiver: ', err);
							throw new Error(err);
						}
						if (responses[0].status === 'success') {
							console.log('Message sent to receiver', receiverSocketId);
						} else if (responses[0].status === 'failure') {
							console.log(
								'Error sending message to receiver: ',
								responses[0].error
							);
						} else {
							// console.log(responses)
							const result = await updateUnreadCount(
								senderId,
								receiverId,
								false
							);
							if (result.success) {
								console.log('Inside sendMessageController: ', result.message);
							} else {
								console.log('Inside sendMessageController: ', result.error);
								throw new Error(result.error);
							}
						}
					}
				);
		} else {
			const result = await updateUnreadCount(senderId, receiverId, false);
			if (result.success) {
				console.log('Inside sendMessageController: ', result.message);
			} else {
				console.log('Inside sendMessageController: ', result.error);
				throw new Error(result.error);
			}
		}

		res.status(201).json(msg);
	} catch (error) {
		console.log('Error sending message: ', error.message);
		return res.status(400).json({ message: error.message });
	}
};

const deleteMessageController = async (req, res) => {
	const senderId = req.user._id;
	let { receiverId, msgId } = req.body;
	receiverId = decryptWithCryptoJS(receiverId);

	let senderUsername = await User.findOne(
		{ _id: senderId },
		{ _id: 0, username: 1 }
	);
	try {
		// console.log('msgId: ', msgId)
		const findMsg = await Message.findOne({
			_id: msgId,
		});

		// console.log('findMsg: ', findMsg)
		if (findMsg) {
			try {
				let deleteRes = await findMsg.deleteOne();

				if (deleteRes.acknowledged === true) {
					// Socket functionality
					const receiverSocketId = getReceiverSocketId(receiverId);
					if (receiverSocketId) {
						io.to(receiverSocketId).emit(
							'deleteMessage',
							msgId,
							senderUsername.username
						);
						// console.log('Deleted Message Id sent to receiver', receiverSocketId)
					}
					return res.status(200).json({ message: 'Message deleted' });
				} else {
					console.log('Error deleting message');
					return res.json({ message: 'Error deleting message' });
				}
			} catch (error) {
				console.log('Error deleting message: ', error.message);
				return res.json({ message: 'Error deleting message' });
			}
		} else {
			return res.json({ message: 'Message not found' });
		}
	} catch (error) {
		console.log('Error finding message: ', error.message);
		return res.json({ message: 'Error finding message' });
	}
};

// const unreadMessageController = async (req, res) => {
//     const { senderUsername, unreadMsgCount } = req.body
//     const receiverId = req.user._id
//     try {
//         const senderId = await User.findOne({ username: senderUsername }, { _id: 1 })
//         // console.log('inside unreadMessageController:', senderId)
//         let findConversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId] },
//         })

//         if (findConversation) {
//             let findUnreadMsgCount = findConversation.unreadMsgCount.find((obj) => obj.senderId.toString() === senderId._id.toString())

//             if (findUnreadMsgCount) {
//                 findUnreadMsgCount.unreadCount = unreadMsgCount
//             } else {
//                 let unreadMsgCount = {
//                     senderId: senderId,
//                     receivers: [receiverId],
//                     unreadCount: unreadMsgCount,
//                 }
//                 findConversation.unreadMsgCount.push(unreadMsgCount)
//             }
//             await findConversation.save()
//         } else {
//             let newConversation = new Conversation({
//                 participants: [senderId, receiverId],
//                 unreadMsgCount: [
//                     {
//                         senderId: senderId,
//                         receivers: [receiverId],
//                         unreadCount: unreadMsgCount,
//                     },
//                 ],
//             })
//             await newConversation.save()
//         }
//         return res.status(200).json({ message: 'Unread message count updated' })
//     } catch (error) {
//         console.log('Error updating unread message count: ', error)
//     }
// }

const deleteConversationController = async (req, res) => {
	const senderId = req.user._id;
	let { receiverId } = req.body;
	receiverId = decryptWithCryptoJS(receiverId);

	try {
		const findConversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
			isGroup: false,
		});

		if (findConversation) {
			await findConversation.deleteOne();
		} else {
			console.log('Conversation not found');
		}

		// Delete the receiver from AddedPeopleToChat
		await AddedPeopleToChat.findOneAndUpdate(
			{
				senderId: senderId,
			},
			{
				$pull: { recivers: receiverId },
			}
		);

		// Delete the sender from AddedPeopleToChat
		await AddedPeopleToChat.findOneAndUpdate(
			{
				senderId: receiverId,
			},
			{
				$pull: { recivers: senderId },
			}
		);

		// Socket functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		let senderUsername = await User.findOne(
			{ _id: senderId },
			{ _id: 0, username: 1 }
		);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit(
				'deleteConversation',
				senderUsername.username
			);
			console.log('Deleted Conversation sent to receiver', receiverSocketId);
		}
		return res.status(200).json({ message: 'Conversation deleted' });
	} catch (error) {
		console.log('Error deleting conversation: ', error.message);
		return res.status(400).json({ message: 'Error deleting conversation' });
	}
};

const blockUserController = async (req, res) => {
	const senderId = req.user._id;
	let { receiverId } = req.body;
	receiverId = decryptWithCryptoJS(receiverId);

	try {
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
			isGroup: false,
		});

		if (conversation) {
			conversation.isBlocked = true;
			conversation.blockedBy = senderId;
			await conversation.save();
		} else {
			let newConversation = new Conversation({
				participants: [senderId, receiverId],
				isBlocked: true,
			});
			await newConversation.save();
		}

		// Socket functionality
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('blockUser', senderId);
			console.log('Blocked User sent to receiver', receiverSocketId);
		}

		return res.status(200).json({ message: 'User blocked' });
	} catch (error) {
		console.log('Error blocking user: ', error.message);
		return res.status(400).json({ message: 'Error blocking user' });
	}
};

const unblockUserController = async (req, res) => {
	const senderId = req.user._id;
	let { receiverId } = req.body;
	receiverId = decryptWithCryptoJS(receiverId);

	try {
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
			isGroup: false,
		});

		if (conversation) {
			console.log('conversation: ', conversation);
			if (conversation.blockedBy && conversation.blockedBy.equals(senderId)) {
				conversation.isBlocked = false;
				conversation.blockedBy = null;
				await conversation.save();

				// Socket functionality
				const receiverSocketId = getReceiverSocketId(receiverId);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit('unblockUser', senderId);
					console.log('Unblocked User sent to receiver', receiverSocketId);
				}
			} else {
				return res.status(400).json({
					message: 'Conversation is not blocked by you',
				});
			}
		} else {
			return res.status(400).json({ message: 'Conversation not found' });
		}

		return res.status(200).json({ message: 'User unblocked' });
	} catch (error) {
		console.log('Error unblocking user: ', error.message);
		return res.status(400).json({ message: 'Error unblocking user' });
	}
};

// const getPeopleToAddController = async (req, res) => {
//     const { currentUserId } = req.body

//     try {
//         const people = await addPeople(currentUserId)
//         return res.status(200).json({ people })
//     } catch (error) {
//         console.log('Error getting people to add: ', error.message)
//         return res.status(400).json({ message: 'Error getting people to add' })
//     }
// }

export {
	blockUserController,
	// unreadMessageController,
	deleteConversationController,
	deleteMessageController,
	messageController,
	sendMessageController,
	unblockUserController,
};
