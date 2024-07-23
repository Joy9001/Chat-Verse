import { handleHtmlOnlineUsers, onlineUsers } from '../socket/socket.js'
import { deleteGroupMessage, handleSendRequestGroup, addChatPopupInitialState } from './groupChat.js'

// convert utc to local time
export const utcToLocal = (utcDate) => {
    const date = new Date(utcDate)

    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    const day = date.getDate().toString()
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${hours}:${minutes} ${day} ${month}, ${year}`
}

export const showNotification = (text) => {
    document.querySelector('#notification-alert').classList.remove('hidden')
    document.querySelector('#notification-alert span').textContent = text

    setTimeout(() => {
        document.querySelector('#notification-alert span').textContent = ''
        document.querySelector('#notification-alert').classList.add('hidden')
    }, 5000)
}

// when chat is clicked
export const chatClicked = async (htmlElement, ...args) => {
    // remove active class from previous chat
    document.querySelector('.chat-child.active') ? document.querySelector('.chat-child.active').classList.remove('active') : null
    document.querySelector('.group-child.active') ? document.querySelector('.group-child.active').classList.remove('active') : null
    htmlElement.classList.add('active')

    // reset unread status
    let unreadElement = htmlElement.children[2]
    unreadElement.children[0].textContent = 0
    unreadElement.classList.contains('hidden') ? null : unreadElement.classList.add('hidden')

    const clickedUser_Username = htmlElement.querySelector('.chat-username').innerText
    let clickedUser = {}

    if (args[0] && args[0].username === clickedUser_Username) {
        clickedUser = args[0]
    } else {
        const clickedUser_Id = htmlElement.dataset.id
        const clickedUser_Name = htmlElement.querySelector('.chat-name').innerText
        const clickedUser_Avatar = htmlElement.querySelector('.chat-img img').src

        clickedUser = {
            encryptedId: clickedUser_Id,
            name: clickedUser_Name,
            avatar: clickedUser_Avatar,
            username: clickedUser_Username,
        }
    }

    let isOnline = false
    let statusElement = htmlElement.querySelector('.avatar')
    // console.log('statusElement', statusElement)

    statusElement.classList.contains('online') ? (isOnline = true) : (isOnline = false)
    handleChatHeadAndEnd(clickedUser, isOnline)
    handleChats(clickedUser)
}

// handle chat head and end
export const handleChatHeadAndEnd = (clickedUser, isOnline = false) => {
    let chat_mid = document.getElementById('all-chats')
    let chat_end = document.getElementById('chats-end')
    let chat_head = document.getElementById('chats-head')
    let chat_head_name = document.getElementById('chat-head-name')
    let chat_head_img = document.getElementById('chat-head-img')
    let to_user_info_popup = document.getElementById('to-user-info-popup')

    chat_head.classList.contains('hidden') ? chat_head.classList.remove('hidden') : null
    chat_mid.classList.contains('hidden') ? chat_mid.classList.remove('hidden') : null
    chat_end.classList.contains('hidden') ? chat_end.classList.remove('hidden') : null

    chat_head_name.textContent = clickedUser.name
    chat_head_img.src = clickedUser.avatar
        ? clickedUser.avatar
        : `https://avatar.iran.liara.run/username?username=${clickedUser.name.replace(/ /g, '+')}`
    to_user_info_popup.querySelector('#to-user-info-popup-name').textContent = clickedUser.name
    to_user_info_popup.querySelector('#to-user-info-popup-username').textContent = clickedUser.username
    to_user_info_popup.querySelector('#to-user-info-popup-img').src = clickedUser.avatar
        ? clickedUser.avatar
        : `https://avatar.iran.liara.run/username?username=${clickedUser.name.replace(/ /g, '+')}`

    let toUserInfoPopupOptions = document.querySelector('.to-user-info-popup-options')
    toUserInfoPopupOptions.classList.contains('hidden') ? toUserInfoPopupOptions.classList.remove('hidden') : null

    let groupInfoPopupOptions = document.querySelector('.group-info-popup-options')
    groupInfoPopupOptions.classList.contains('hidden') ? null : groupInfoPopupOptions.classList.add('hidden')

    if (isOnline) {
        chat_head.querySelector('.avatar').classList.add('online')
    } else {
        chat_head.querySelector('.avatar').classList.remove('online')
    }

    // hide copy grp link btn
    let copyBtn = document.querySelector('#copy-group-link-btn')
    copyBtn.classList.contains('hidden') ? null : copyBtn.classList.add('hidden')
}

export const handleChats = (clickedUser) => {
    let chatSection = document.querySelector('.chat-section')
    if (chatSection.classList.contains('hidden')) chatSection.classList.remove('hidden')

    let toUserProfileSecImg = document.querySelector('.to-user-profile-sec-img img')
    toUserProfileSecImg.src = clickedUser.avatar
        ? clickedUser.avatar
        : `https://avatar.iran.liara.run/username?username=${clickedUser.name.replace(/ /g, '+')}`

    let toUserProfileSecName = document.querySelector('.to-user-profile-sec-name h1')
    let toUserProfileSecUsername = document.querySelector('.to-user-profile-sec-name h3')
    toUserProfileSecName.textContent = clickedUser.name
    toUserProfileSecUsername.textContent = clickedUser.username
    toUserProfileSecUsername.parentElement.dataset.tip = clickedUser.username

    let receiverId = clickedUser.encryptedId

    handleConversation(receiverId)
}

export const handleConversation = (receiverId) => {
    let chat_end = document.getElementById('chats-end')

    fetch('/conv-api/get-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverId }),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log('data', data)
            let isBlocked = data.isBlocked
            let blockedBy = data.blockedBy
            let currentUserId = data.senderId
            if (isBlocked) {
                chat_end.classList.add('hidden')
                let blockDiv = document.querySelector('#chats-end-block')
                blockDiv.classList.remove('hidden')
            }
            if (blockedBy === currentUserId) {
                let blockBtnChild = document.querySelector('#block-to-user').children[0]
                blockBtnChild.textContent = 'Unblock'
            } else if (blockedBy !== null) {
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
            handleHtmlConversation(data)
        })
        .catch((err) => {
            console.log('Error in getting conversation: ', err)
        })
}

export const handleHtmlConversation = (data) => {
    const currentUserId = data.senderId
    // console.log('Data: ', data)

    let msgContainerDiv = document.querySelector('.message-container')

    if (data.messages.length === 0) {
        msgContainerDiv.textContent = ''
        return
    } else {
        // console.log("Creating new conversation", data.messages);
        msgContainerDiv.textContent = ''
        let date = ''
        data.messages = data.messages.filter((msg) => msg !== null)
        data.messages.forEach((msg) => {
            // console.log("Message: ", msg);
            // create date
            let msgDate = utcToLocal(msg.createdAt).slice(6)
            if (msgDate !== date) {
                date = msgDate
                const dayDiv = document.createElement('div')
                dayDiv.classList.add('day')
                const dateDiv = document.createElement('div')
                dateDiv.classList.add('date')
                const dateh1 = document.createElement('h1')
                dateh1.textContent = date

                dateDiv.appendChild(dateh1)
                dayDiv.appendChild(dateDiv)
                msgContainerDiv.appendChild(dayDiv)
            }

            if (msg.senderId === currentUserId) {
                let fromUserMsg = fromUserMsgComponent(msg.message, msg._id, utcToLocal(msg.createdAt).slice(0, 5))
                msgContainerDiv.appendChild(fromUserMsg)
            } else {
                let toUserMsg = toUserMsgComponent(msg.message, msg._id, utcToLocal(msg.createdAt).slice(0, 5))
                msgContainerDiv.appendChild(toUserMsg)
            }
        })
        msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
    }
}

export const fromUserMsgComponent = (msg, msgId, time) => {
    let component = document.createElement('div')
    component.classList.add('from-user-msg')
    component.dataset.id = msgId
    component.innerHTML = `
        <div class="delete-msg-btn hidden pr-2">
            <button class="btn btn-circle btn-outline border-neutral bg-neutral hover:bg-accent hover:border-accent h-6 w-6 min-h-4 group">
                <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-accent group-hover:stroke-neutral" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
            </button>
        </div>
        <div id="from-user-msg-container" class="msg-container">
            <p class="py-1 text-base font-semibold text-black">${msg}</p>
            <span class="text-sm font-normal text-black">${time}</span>
        </div>
    `
    return component
}

export const toUserMsgComponent = (msg, msgId, time) => {
    let component = document.createElement('div')
    component.classList.add('to-user-msg')
    component.dataset.id = msgId
    component.innerHTML = `
        <div id="to-user-msg-container" class="msg-container">
            <p class="py-1 text-base font-semibold text-black">${msg}</p>
            <span class="text-sm font-normal text-black">${time}</span>
        </div>
        <div class="delete-msg-btn hidden pl-2">
            <button class="btn btn-circle btn-outline border-accent bg-accent hover:bg-neutral hover:border-neutral h-6 w-6 min-h-4 group">
                <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-neutral group-hover:stroke-accent" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
            </button>
        </div>
    `
    return component
}

export const createLeftsidePeople = (data) => {
    let parentDiv = leftSidePersonComponent(data)

    let allPrivateChats = document.querySelector('.private-chats')
    allPrivateChats.appendChild(parentDiv)

    chatClicked(parentDiv, data)
    handleHtmlOnlineUsers(onlineUsers)
}

export const leftSidePersonComponent = (data) => {
    let parentDiv = document.createElement('div')
    parentDiv.classList.add('chat-child', 'group')
    parentDiv.dataset.id = data.encryptedId ? data.encryptedId : data._id
    let onlineClass = data.isOnline ? 'online' : ''
    parentDiv.innerHTML = `
        <div class="avatar ${onlineClass}">
            <div class="chat-img w-14 scale-110 rounded-full">
                <img draggable="false" class="scale-110" src="${data.avatar}" alt="${data.username}" />
            </div>
        </div>
        <div class="chat-name-parent">
            <h4 class="chat-name">${data.name}</h4>
            <h4 class="chat-username">${data.username}</h4>
        </div>
        <div class="unread-badge hidden right-8">
            <div class="badge bg-secondary text-white">0</div>
        </div>
    `
    return parentDiv
}

export const addPeopleToChat = async (element) => {
    let alreadyThere = false
    let clickedPerson = ''
    // console.log(element.children[1].children)
    const eleUsername = element.children[1].children[1].innerText

    // Easter egg
    let currentUserName = document.querySelector('#change-details-username').value
    let selfChatJokes = [
        "Talking to yourself? It's not a bug, it's a feature request!",
        'Self-chatting: the ultimate form of code review.',
        'Error 404: Self-chat not found. But hey, who needs other people?',
        "Trying to chat with yourself? Sorry, we're still working on that mirror feature.",
        'Self-chatting: because sometimes even your code needs a pep talk.',
        'Looks like you want to talk to yourself. We call that solo debugging!',
        'No self-chatting yet, but we admire your self-confidence!',
        'Attempting self-chat? Our servers recommend a rubber duck instead.',
        'Self-chatting not available. Try talking to your rubber duck instead!',
        "Hold on, we're still working on that 'inner monologue' feature.",
        'Self-chatting is under construction. Meanwhile, feel free to talk to your plants!',
        "Mirror, mirror on the wall, self-chat isn't here at all!",
        'Self-chatting feature in progress. For now, practice your stand-up routine!',
        'Talking to yourself? You must be debugging in style!',
        "Self-chat isn't ready, but you can always practice your next big speech.",
        "Looks like you're trying to chat with yourself. Maybe take a coffee break instead!",
        'Self-chat feature coming soon. In the meantime, how about a quick meditation session?',
        "Self-chatting isn't supported yet. Try our premium feature: talking to a pillow!",
    ]
    if (eleUsername === currentUserName) {
        let alert = document.querySelector('.alert')
        let alertText = alert.querySelector('span')
        alertText.innerHTML = `Well, you found an easter egg! Here's a joke: <b>${selfChatJokes[Math.floor(Math.random() * selfChatJokes.length)]}</b>`
        alert.classList.remove('hidden')
        setTimeout(() => {
            alert.classList.add('hidden')
            alertText.textContent = ''
        }, 15000)
        return
    }

    const eleName = element.children[1].children[0].innerText
    const eleAvatar = element.children[0].src
    const eleId = element.dataset.id

    let eleData = {
        encryptedId: eleId,
        name: eleName,
        username: eleUsername,
        avatar: eleAvatar,
    }

    let privateChats = document.querySelector('.private-chats')
    privateChats.open ? null : (privateChats.open = true)

    let leftPeople = document.querySelectorAll('.chat-child')
    leftPeople.forEach((person) => {
        let personUsername = person.querySelector('.chat-username').innerText

        if (personUsername === eleData.username) {
            alreadyThere = true
            clickedPerson = person

            if (person.classList.contains('hidden')) {
                person.classList.remove('hidden')
            }
        }
    })

    // console.log('alreadyThere', alreadyThere)
    if (!alreadyThere) {
        fetch('/add-people-api/add-people-to-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                receiverId: eleData.encryptedId,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Added people to chat') {
                    createLeftsidePeople(data.newPerson)
                    // console.log(data.newPeople)
                }
            })
            .catch((error) => {
                console.log('Error getting people', error)
            })
    } else {
        // console.log('clickedPerson', clickedPerson)
        chatClicked(clickedPerson, eleData)
        // console.log("Online users here", atob(onlineUsers));
    }

    document.querySelector('#transparent-modal').click()
}

export const handleHtmlSend = (msgRes) => {
    let msgContainerDiv = document.querySelector('.message-container')

    let date = utcToLocal(msgRes.createdAt)
    let msgDate = date.slice(6)
    let msgTime = date.slice(0, 5)

    let dates = Array.from(document.querySelectorAll('.date'))

    if (dates.length === 0 || dates[dates.length - 1].innerText !== msgDate) {
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

    let fromUserMsg = fromUserMsgComponent(msgRes.message, msgRes._id, msgTime)
    msgContainerDiv.appendChild(fromUserMsg)

    msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
}

export const handleSendRequest = async (receiverId, msg) => {
    fetch('/chat/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiverId,
            message: msg,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log('data in /chat/send-message', data)
            if (data.message === 'User is blocked') {
                let alert = document.querySelector('.alert')
                alert.children[1].innerHTML = 'User is blocked'
                alert.classList.remove('hidden')
                setTimeout(() => {
                    alert.classList.add('hidden')
                }, 5000)
            } else {
                handleHtmlSend(data)
            }
        })
        .catch((err) => {
            console.log('Error in sending message: ', err)
        })
}

export const deleteMessage = async (msg) => {
    let msgId = msg.dataset.id
    // console.log('msgId', msgId)

    let receiverId = document.querySelector('.chat-child.active').dataset.id

    fetch('/chat/delete-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiverId,
            msgId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.message)
            if (data.message === 'Message deleted') {
                msg.remove()
                let days = document.querySelectorAll('.day')
                days.forEach((day) => {
                    if (day.nextElementSibling === null || day.nextElementSibling.classList.contains('day')) {
                        day.remove()
                    }
                })
                let alert = document.querySelector('.alert')
                alert.children[1].textContent = 'Message deleted for both'
                alert.classList.remove('hidden')
                setTimeout(() => {
                    alert.classList.add('hidden')
                }, 5000)
            }
        })
        .catch((err) => {
            console.log('Error in deleting message: ', err)
        })
}

export const deleteConversation = async () => {
    let chat_mid = document.getElementById('all-chats')
    let chat_end = document.getElementById('chats-end')
    let chat_head = document.getElementById('chats-head')
    let blockDiv = document.querySelector('#chats-end-block')

    let receiver = document.querySelector('.chat-child.active')
    let receiverId = receiver.dataset.id

    fetch('/chat/delete-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiverId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.message)
            if (data.message === 'Conversation deleted') {
                // receiver.classList.remove('active')
                // receiver.classList.add('hidden')
                receiver.remove()
                chat_head.classList.add('hidden')
                chat_mid.classList.add('hidden')
                chat_end.classList.add('hidden')
                blockDiv.classList.add('hidden')

                let alert = document.querySelector('.alert')
                alert.children[1].textContent = 'Conversation deleted'
                alert.classList.remove('hidden')

                setTimeout(() => {
                    alert.classList.add('hidden')
                }, 5000)
            }
        })
        .catch((err) => {
            console.log('Error in deleting conversation: ', err)
        })
}

export const handleBlockUser = (receiverId, htmlElement) => {
    let chat_end = document.getElementById('chats-end')
    let blockDiv = document.querySelector('#chats-end-block')

    fetch('/chat/block-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiverId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.message)
            if (data.message === 'User blocked') {
                htmlElement.children[0].textContent = 'Unblock'
                chat_end.classList.add('hidden')
                blockDiv.classList.remove('hidden')
            }
        })
        .catch((err) => {
            console.log('Error in blocking user: ', err)
        })
}

export const handleUnblockUser = (receiverId, htmlElement) => {
    let chat_end = document.getElementById('chats-end')
    let blockDiv = document.querySelector('#chats-end-block')

    fetch('/chat/unblock-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            receiverId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.message)
            if (data.message === 'User unblocked') {
                htmlElement.children[0].textContent = 'Block'
                blockDiv.classList.add('hidden')
                chat_end.classList.remove('hidden')
            }
        })
        .catch((err) => {
            console.log('Error in unblocking user: ', err)
        })
}

export const blockUnblockUser = async (htmlElement) => {
    let receiver = document.querySelector('.chat-child.active')
    let receiverId = receiver.dataset.id

    let blockStatus = htmlElement.children[0].innerText

    if (blockStatus === 'Block') {
        handleBlockUser(receiverId, htmlElement)
    } else {
        handleUnblockUser(receiverId, htmlElement)
    }
}

// Refresh access token every 10 minutes
export const setIntervalId = setInterval(
    () => {
        fetch('/auth/jwt/refresh-token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.error) clearInterval(setIntervalId)
            })
            .catch((error) => console.log(error.message))
    },
    1000 * 60 * 5 // 5 minutes
)
