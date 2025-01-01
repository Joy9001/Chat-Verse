import io from 'socket.io-client'
import { leftSidePersonComponent, showNotification, toUserMsgComponent, utcToLocal } from '../components/chat.js'
import { createLeftsideGroup, toUserGroupMsgComponent } from '../components/groupChat.js'

// show the message in the chat section
const handleHtmlGet = (message) => {
	let date = utcToLocal(message.createdAt)
	let msgDate = date.slice(6)
	let msgTime = date.slice(0, 5)

	let dates = Array.from(document.querySelectorAll('.date'))
	let msgContainerDiv = document.querySelector('.message-container')

	if (dates.length === 0 || dates[dates.length - 1].textContent !== msgDate) {
		const dayDiv = document.createElement('div')
		dayDiv.classList.add('day')
		const dateDiv = document.createElement('div')
		dateDiv.classList.add('date')
		const dateh1 = document.createElement('h1')
		dateh1.textContent = msgDate

		dateDiv.appendChild(dateh1)
		dayDiv.appendChild(dateDiv)
		msgContainerDiv.appendChild(dayDiv)
	}

	let toUserMsg = toUserMsgComponent(message.message, message._id, msgTime)

	msgContainerDiv.appendChild(toUserMsg)
	msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
}

// update the online users status in the left side chat list
const handleHtmlOnlineUsers = (users) => {
	const leftPeople = document.querySelectorAll('.chat-child')
	leftPeople.forEach(async (person) => {
		let personUsername = person.querySelector('.chat-username').innerText
		let status = person.querySelector('.avatar')

		if (users && users.includes(personUsername)) {
			status.classList.contains('online') ? null : status.classList.add('online')
			if (person.classList.contains('active')) {
				let chat_head = document.querySelector('.chats-head')
				let chat_head_status = chat_head.querySelector('.avatar')
				chat_head_status.classList.contains('online') ? null : chat_head_status.classList.add('online')
			}
		} else {
			status.classList.contains('online') ? status.classList.remove('online') : null
		}
	})
}

// create the left side chat list for the new user
const createLeftsidePeopleR = (data) => {
	let parentDiv = leftSidePersonComponent(data)

	let allPrivateChats = document.querySelector('.private-chats')
	allPrivateChats.appendChild(parentDiv)
	return parentDiv
}

console.log('Connecting to server', process.env.DOMAIN)
const socket = io(process.env.DOMAIN, {
	withCredentials: true,
})

let onlineUsers = []

// listen for online users
socket.on('getOnlineUsers', (users) => {
	onlineUsers = users
	handleHtmlOnlineUsers(users)
})

// listen for new message
socket.on('newMessage', async (message, senderUsername, callback) => {
	let sender = ''

	// Find Sender in the active chat
	let leftPeople = document.querySelectorAll('.chat-child')
	leftPeople.forEach((person) => {
		let personUsername = person.querySelector('.chat-username').innerText
		if (personUsername === senderUsername) {
			sender = person
		}
	})

	// Find Sender in the people popup
	if (sender === '') {
		let popupPeople = document.querySelectorAll('.new-chat-people')
		popupPeople.forEach((person) => {
			let personUsername = person.querySelector('.new-chat-people-username').innerText.trim()

			if (personUsername === senderUsername) {
				let personName = person.querySelector('.new-chat-people-name').innerText
				let personAvatar = person.querySelector('.new-chat-people-avatar').src
				let personId = person.dataset.id
				sender = {
					name: personName,
					username: personUsername,
					avatar: personAvatar,
					encryptedId: personId,
					isOnline: true,
				}
			}
		})

		if (sender === '') {
			// console.log('Sender not found', senderUsername)
			callback({
				status: 'failure',
				error: 'Sender not found',
			})
			return
		} else {
			sender = createLeftsidePeopleR(sender)
		}
	}

	if (sender.classList.contains('active')) {
		handleHtmlGet(message)
		callback({
			status: 'success',
		})
	} else {
		let unreadMsg = sender.children[2]

		let unreadMsgCount = parseInt(unreadMsg.innerText) + 1
		unreadMsg.children[0].textContent = unreadMsgCount
		unreadMsg.classList.remove('hidden')

		if (unreadMsgCount === 1) {
			showNotification(`You have a new message from "${senderUsername}"`)
		} else {
			showNotification(`You have ${unreadMsgCount} new messages from "${senderUsername}"`)
		}

		callback({
			status: 'unread',
		})
	}
})

// listen for deleted message
socket.on('deleteMessage', (dltMsgId, senderUsername) => {
	// console.log("Deleted message", dltMsgId);
	let activePerson = document.querySelector('.chat-child.active')

	if (activePerson) {
		let personUnsername = activePerson.querySelector('.chat-username').innerText

		if (personUnsername === senderUsername) {
			let allToUserMsg = document.querySelectorAll('.to-user-msg')
			allToUserMsg.forEach((msg) => {
				let msgId = msg.dataset.id
				// console.log('msgId', msgId, 'dltMsgId', dltMsgId)
				if (msgId === dltMsgId) {
					msg.remove()
				}
			})

			let allFromuserMsg = document.querySelectorAll('.from-user-msg')
			allFromuserMsg.forEach((msg) => {
				let msgId = msg.dataset.id
				// console.log('msgId', msgId, 'dltMsgId', dltMsgId)
				if (msgId === dltMsgId) {
					msg.remove()
				}
			})

			let days = document.querySelectorAll('.day')
			days.forEach((day) => {
				if (day.nextElementSibling === null || day.nextElementSibling.classList.contains('day')) {
					day.remove()
				}
			})
		}
	} else {
		let leftPeople = document.querySelectorAll('.chat-child')
		leftPeople.forEach((person) => {
			let personUsername = person.querySelector('.chat-username').innerText
			if (personUsername === senderUsername) {
				let unreadMsg = person.children[2]
				if (unreadMsg.classList.contains('hidden')) {
					return
				}
				let unreadMsgCount = parseInt(unreadMsg.innerText) - 1
				unreadMsg.children[0].textContent = unreadMsgCount
				if (unreadMsgCount === 0) {
					unreadMsg.classList.add('hidden')
				}
			}
		})
	}
})

// listen for deleted conversation
socket.on('deleteConversation', (senderUsername) => {
	let leftPeople = document.querySelectorAll('.chat-child')
	leftPeople.forEach((person) => {
		let personUsername = person.querySelector('.chat-username').innerText
		if (personUsername === senderUsername) {
			person.remove()
		}
	})
	let chat_head = document.getElementById('chats-head')
	let chat_mid = document.getElementById('all-chats')
	let chat_end = document.getElementById('chats-end')
	let blockDiv = document.querySelector('#chats-end-block')
	let blockOption = document.querySelector('.block-info')
	let blockBtn = document.querySelector('#block-to-user')
	let deleteChatBtn = document.querySelector('#delete-chat-to-user')

	chat_head.classList.add('hidden')
	chat_mid.classList.add('hidden')
	chat_mid.querySelector('.message-container').innerHTML = ''
	chat_end.classList.add('hidden')
	blockDiv.classList.add('hidden')
	if (blockOption) {
		blockOption.remove()
	}
	blockBtn.classList.remove('hidden')
	deleteChatBtn.classList.remove('hidden')
})

// listen for blocked user
socket.on('blockUser', (senderId) => {
	// console.log('Blocked user', senderId)

	if (document.querySelector('.chat-child.active')) {
		let chat_end = document.getElementById('chats-end')
		chat_end.classList.add('hidden')

		let blockDiv = document.querySelector('#chats-end-block')
		blockDiv.classList.remove('hidden')

		let blockBtn = document.querySelector('#block-to-user')
		blockBtn.classList.add('hidden')

		let deleteChatBtn = document.querySelector('#delete-chat-to-user')
		deleteChatBtn.classList.add('hidden')

		let blockInfoDiv = document.querySelector('.block-info')
		if (blockInfoDiv.classList.contains('hidden')) {
			blockInfoDiv.classList.remove('hidden')
		}

		let toUserInfoPopupOptions = document.querySelector('.to-user-info-popup-options')
		toUserInfoPopupOptions.classList.contains('hidden') ? toUserInfoPopupOptions.classList.remove('hidden') : null
		toUserInfoPopupOptions.appendChild(blockInfoDiv)
	}
})

// listen for unblocked user
socket.on('unblockUser', (senderId) => {
	// console.log('Unblocked user', senderId)
	if (document.querySelector('.chat-child.active')) {
		let blockDiv = document.querySelector('#chats-end-block')
		blockDiv.classList.add('hidden')

		let blockBtn = document.querySelector('#block-to-user')
		blockBtn.classList.remove('hidden')

		let deleteChatBtn = document.querySelector('#delete-chat-to-user')
		deleteChatBtn.classList.remove('hidden')

		let blockInfoDiv = document.querySelector('.block-info')
		if (!blockInfoDiv.classList.contains('hidden')) {
			// console.log('removing')
			blockInfoDiv.classList.add('hidden')
		}

		let chat_end = document.getElementById('chats-end')
		chat_end.classList.remove('hidden')
	}
})

// listen for changed user details
socket.on('receiver-changed-details', (oldUserDetails, newUserDetails, callback) => {
	try {
		// add user popup
		let popupPeople = document.querySelectorAll('.new-chat-people')
		popupPeople.forEach((person) => {
			let personUsername = person.querySelector('.new-chat-people-username').innerText.trim()
			if (personUsername === oldUserDetails.username) {
				person.querySelector('.new-chat-people-name').textContent = newUserDetails.name
				person.querySelector('.new-chat-people-username').textContent = newUserDetails.username
				person.querySelector('.new-chat-people-avatar').src = newUserDetails.avatar
			}
		})

		// left side chats list
		let allLeftSideUser = document.querySelectorAll('.chat-child')
		allLeftSideUser.forEach((user) => {
			let username = user.querySelector('.chat-username').innerText.trim()
			if (username === oldUserDetails.username) {
				user.querySelector('.chat-name').textContent = newUserDetails.name
				user.querySelector('.chat-username').textContent = newUserDetails.username
				user.querySelector('.chat-img img').src = newUserDetails.avatar

				// chat section on right
				if (user.classList.contains('active')) {
					// chat head
					let chat_head = document.querySelector('.chats-head')
					chat_head.querySelector('.chat-img img').src = newUserDetails.avatar
					chat_head.querySelector('#chat-head-name').textContent = newUserDetails.name

					// chat head popup
					document.querySelector('.to-user-info-popup-details img').src = newUserDetails.avatar
					document.querySelector('.to-user-info-popup-details h3').textContent = newUserDetails.name
					document.querySelector('.to-user-info-popup-details h4').textContent = newUserDetails.username

					// chat mid
					let toUserProfileSec = document.querySelector('.to-user-profile-sec')
					toUserProfileSec.querySelector('.to-user-profile-sec-img img').src = newUserDetails.avatar
					toUserProfileSec.querySelector('.to-user-profile-sec-name h1').textContent = newUserDetails.name
					toUserProfileSec.querySelector('.to-user-profile-sec-name h3').textContent = newUserDetails.username
				}
			}
		})

		callback({
			status: 'success',
			message: 'details updated',
		})
	} catch (error) {
		// console.log('Error:', error)
		callback({
			status: 'failure',
			error: error,
		})
	}
})

// listen for joining the group
socket.on('join-group', (data) => {
	socket.emit('join-room', { roomId: data.roomId })

	let currentUserName = document.querySelector('#change-details-name').value

	if (currentUserName !== data.creatorName) createLeftsideGroup(data.groupInfo, false)
})

// listen for new group message
socket.on('group-message', (data, callback) => {
	// console.log(data)
	const { groupId, message, msgId, createdAt, senderName } = data

	let findGroup = ''

	let allGroups = document.querySelectorAll('.group-child')
	allGroups.forEach((group) => {
		let id = group.dataset.id
		// console.log(id, groupId)
		if (id === groupId) {
			findGroup = group
		}
	})

	if (findGroup === '') {
		// console.log('Group not found')
		callback({
			status: 'failure',
			error: 'Group not found',
		})
		return
	}

	if (findGroup.classList.contains('active')) {
		let date = utcToLocal(createdAt)
		let msgDate = date.slice(6)
		let msgTime = date.slice(0, 5)

		let dates = Array.from(document.querySelectorAll('.date'))
		let msgContainerDiv = document.querySelector('.message-container')

		if (dates.length === 0 || dates[dates.length - 1].textContent !== msgDate) {
			const dayDiv = document.createElement('div')
			dayDiv.classList.add('day')
			const dateDiv = document.createElement('div')
			dateDiv.classList.add('date')
			const dateh1 = document.createElement('h1')
			dateh1.textContent = msgDate

			dateDiv.appendChild(dateh1)
			dayDiv.appendChild(dateDiv)
			msgContainerDiv.appendChild(dayDiv)
		}

		let toUserMsg = toUserGroupMsgComponent(message, msgId, msgTime, senderName)

		msgContainerDiv.appendChild(toUserMsg)
		msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
		callback({
			status: 'success',
		})
	} else {
		let unreadMsgStatus = findGroup.querySelector('.unread-badge')
		let unreadMsgCount = parseInt(unreadMsgStatus.children[0].textContent) + 1
		unreadMsgStatus.children[0].textContent = unreadMsgCount
		unreadMsgStatus.classList.remove('hidden')

		let groupName = findGroup.querySelector('.group-name').innerText

		if (unreadMsgCount === 1) {
			showNotification(`You have a new message in "${groupName}" group`)
		} else {
			showNotification(`You have ${unreadMsgCount} new messages in "${groupName}" group`)
		}

		callback({
			status: 'unread',
		})
	}
})

// listen for deleted group message
socket.on('delete-group-message', (data) => {
	const { groupId, msgId, deletedBy } = data
	let allGroups = document.querySelectorAll('.group-child')
	let findGroup = ''

	allGroups.forEach((group) => {
		let id = group.dataset.id
		if (id === groupId) {
			findGroup = group
		}
	})

	if (findGroup && findGroup.classList.contains('active')) {
		let activeGroupId = findGroup.dataset.id

		if (activeGroupId === groupId) {
			let allToUserMessage = document.querySelectorAll('.to-user-msg')

			allToUserMessage.forEach((msg) => {
				let messageId = msg.dataset.id
				if (msgId === messageId) {
					msg.remove()
				}
			})

			let days = document.querySelectorAll('.day')
			days.forEach((day) => {
				if (day.nextElementSibling === null || day.nextElementSibling.classList.contains('day')) {
					day.remove()
				}
			})
		}
	} else if (findGroup) {
		let unreadMsgStatus = findGroup.querySelector('.unread-badge')
		if (unreadMsgStatus.classList.contains('hidden')) {
			return
		}
		let unreadMsgCount = parseInt(unreadMsgStatus.children[0].innerText) - 1
		unreadMsgStatus.children[0].textContent = unreadMsgCount
		if (unreadMsgCount === 0) {
			unreadMsgStatus.classList.add('hidden')
		}
	}

	let groupName = findGroup.querySelector('.group-name').innerText
	showNotification(`"${deletedBy}" deleted a message in "${groupName}" group`)
})

//~ listen for leaving and deleting group

socket.on('connect', () => {
	console.log('Connected to server')
})

socket.on('disconnect', () => {
	console.log('Disconnected from server')
})

export { handleHtmlOnlineUsers, onlineUsers }
