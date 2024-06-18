import io from 'socket.io-client'
import { utcToLocal } from '../components/chat.js'

const handleHtmlGet = (message) => {
    let date = utcToLocal(message.createdAt)
    let msgDate = date.slice(6)
    let msgTime = date.slice(0, 5)

    let dates = document.querySelectorAll('.date')
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

    let msg_div = document.createElement('div')
    msg_div.classList.add('to-user-msg')
    msg_div.dataset.id = message._id
    // console.log('message id', message._id)

    //Message
    let msgTextDiv = document.createElement('div')
    msgTextDiv.classList.add('msg-container')
    let msgP = document.createElement('p')
    msgP.textContent = message.message
    let msgTimeP = document.createElement('p')
    msgTimeP.textContent = msgTime
    msgTextDiv.appendChild(msgP)
    msgTextDiv.appendChild(msgTimeP)

    // Delete Button
    const deleteMsgBtnDiv = document.createElement('div')
    deleteMsgBtnDiv.classList.add('delete-msg-btn', 'pl-2', 'hidden')
    // deleteMsgBtnDiv.setAttribute('onclick', 'deleteMessage(this)')

    deleteMsgBtnDiv.innerHTML = DOMPurify.sanitize(`
        <button class="btn btn-circle btn-outline border-[#E9E9E9] bg-[#4b2138] hover:bg-[#E9E9E9] hover:border-[#4b2138] h-6 w-6 min-h-4 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:stroke-[#4b2138] stroke-[#E9E9E9]" fill="none" viewBox="0 0 24 24" stroke="#4B2138"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    `)
    msg_div.appendChild(msgTextDiv)
    msg_div.appendChild(deleteMsgBtnDiv)

    msgContainerDiv.appendChild(msg_div)
    msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
}

const handleHtmlOnlineUsers = (users) => {
    const leftPeople = document.querySelectorAll('.chat-child')
    leftPeople.forEach(async (person) => {
        const personUsername = person.querySelector('.chat-username').innerText
        let personData = await fetch('/get-conv-api/user-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: personUsername,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('handleHtmlOnlineUsers', data)
                return data
            })
            .catch((error) => {
                console.log('Error:', error)
            })

        let status = person.children[0].children[0]
        let toUserProfile = document.querySelector('.to-user-profile')
        let toUserStatus = toUserProfile.children[0].children[0]

        if (users.includes(personData._id)) {
            if (status.classList.contains('hidden')) {
                status.classList.remove('hidden')
                toUserStatus.classList.remove('hidden')
            }
        } else {
            if (!status.classList.contains('hidden')) {
                status.classList.add('hidden')
                toUserStatus.classList.add('hidden')
            }
        }
    })
}

const createLeftsidePeopleR = (data) => {
    let parentDiv = document.createElement('div')
    parentDiv.classList.add('chat-child')
    // parentDiv.dataset.element = btoa(JSON.stringify(data))
    // parentDiv.onclick = () => chatClicked(parentDiv)

    let imgDiv = document.createElement('div')
    imgDiv.classList.add('chats_img')
    imgDiv.classList.add('indicator')

    let statusDiv = `<span class="indicator-item badge badge-success h-2 p-[0.4rem] translate-x-[5%] translate-y-[10%] status"></span>`

    let img = document.createElement('img')
    img.src = data.avatar
        ? data.avatar
        : `https://avatar.iran.liara.run/username?username=${data.name.replace(/ /g, '+')}`
    img.alt = data.name

    imgDiv.innerHTML = DOMPurify.sanitize(statusDiv)
    imgDiv.appendChild(img)
    parentDiv.appendChild(imgDiv)

    let nameDiv = document.createElement('div')
    nameDiv.classList.add('chat-name-parent')

    let name = document.createElement('h4')
    name.classList.add('chat-name')
    name.textContent = data.name.trim()

    let username = document.createElement('h4')
    username.classList.add('chat-username')
    username.textContent = data.username.trim()

    nameDiv.appendChild(name)
    nameDiv.appendChild(username)
    parentDiv.appendChild(nameDiv)

    let badgeDiv = `
	<div class="unread-badge absolute right-8 hidden">
        <div class="badge bg-[#6D3C52] text-white">0</div>
    </div>`

    parentDiv.innerHTML += DOMPurify.sanitize(badgeDiv)

    let all_chats = document.getElementById('chat-parent')
    all_chats.appendChild(parentDiv)
    return parentDiv
}

const socket = io(process.env.SITE_URL, {
    withCredentials: true,
})

let onlineUsers = []
socket.on('getOnlineUsers', (users) => {
    // console.log('Online users', users)
    onlineUsers = users
    handleHtmlOnlineUsers(users)
})

socket.on('newMessage', async (message, senderUsername, callback) => {
    // console.log('New message', message)
    let sender = ''

    // Find Sender in the active chat
    let leftPeople = document.querySelectorAll('.chat-child')
    leftPeople.forEach((person) => {
        // let data = JSON.parse(atob(person.dataset.element))
        let personUsername = person.querySelector('.chat-username').innerText

        if (personUsername === senderUsername) {
            sender = person
        }
    })

    // Find Sender in the people popup
    if (sender === '') {
        let popupPeople = document.querySelectorAll('.popup-people')
        popupPeople.forEach((person) => {
            // let data = JSON.parse(atob(person.dataset.element))
            let personUsername = person.querySelector('.popup-people-username').innerText.trim()
            // console.log(personUsername)
            if (personUsername === senderUsername) {
                let personName = person.querySelector('.popup-people-name').innerText
                let personAvatar = person.querySelector('.popup-people-avatar').src
                sender = {
                    name: personName,
                    username: personUsername,
                    avatar: personAvatar,
                }
            }
        })

        if (sender === '') {
            console.log('Sender not found', senderUsername)
            callback({
                status: 'failure',
                error: 'Sender not found',
            })
            return
        } else {
            console.log('creating')
            sender = createLeftsidePeopleR(sender)
        }
    }

    // console.log('sender', sender.children[2])
    if (sender.classList.contains('active')) {
        handleHtmlGet(message)
        callback({
            status: 'success',
        })
    } else {
        let unreadMsg = sender.children[2]
        // console.log("sender", sender);
        // console.log('unreadMsg', unreadMsg)
        let unreadMsgCount = parseInt(unreadMsg.innerText) + 1
        unreadMsg.children[0].textContent = unreadMsgCount
        unreadMsg.classList.remove('hidden')

        document.querySelector('#notification-alert').classList.remove('hidden')

        if (unreadMsgCount === 1) {
            document.querySelector('#notification-alert span').textContent =
                `You have a new message from ${senderUsername}`
        } else {
            document.querySelector('#notification-alert span').textContent =
                `You have ${unreadMsgCount} new messages from ${senderUsername}`
        }

        setTimeout(() => {
            document.querySelector('#notification-alert span').textContent = ''
            document.querySelector('#notification-alert').classList.add('hidden')
        }, 5000)

        callback({
            status: 'unread',
        })
    }
})

socket.on('deleteMessage', (dltMsgId, senderUsername) => {
    // console.log("Deleted message", dltMsgId);
    let activePerson = document.querySelector('.chat-child.active')

    if (activePerson && activePerson.children[1].children[1].textContent === senderUsername) {
        // console.log('deleting message', dltMsgId)
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
            if (day.nextElementSibling === null) {
                day.remove()
            }
        })
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
        toUserInfoPopupOptions.appendChild(blockInfoDiv)
    }
})

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

socket.on('receiver-changed-details', (oldUserDetails, newUserDetails, callback) => {
    try {
        // add user popup
        let popupPeople = document.querySelectorAll('.popup-people')
        popupPeople.forEach((person) => {
            let personUsername = person.querySelector('.popup-people-username').innerText.trim()
            if (personUsername === oldUserDetails.username) {
                person.querySelector('.popup-people-name').textContent = newUserDetails.name
                person.querySelector('.popup-people-username').textContent = newUserDetails.username
                person.querySelector('.popup-people-avatar').src = newUserDetails.avatar
            }
        })

        // left side chats list
        let allLeftSideUser = document.querySelectorAll('.chat-child')
        allLeftSideUser.forEach((user) => {
            let username = user.querySelector('.chat-username').innerText.trim()
            if (username === oldUserDetails.username) {
                user.querySelector('.chat-name').textContent = newUserDetails.name
                user.querySelector('.chat-username').textContent = newUserDetails.username
                user.querySelector('.chats_img img').src = newUserDetails.avatar

                // chat section on right
                if (user.classList.contains('active')) {
                    // chat head
                    let chat_head = document.querySelector('.chats-head')
                    chat_head.querySelector('.chats_img img').src = newUserDetails.avatar
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
        console.log('Error:', error)
        callback({
            status: 'failure',
            error: error,
        })
    }
})

socket.on('connection', () => {
    console.log('Connected to server', socket.id)
})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

export { onlineUsers, handleHtmlOnlineUsers }
