import { utcToLocal } from './chat.js'

// search people function
export const searchPeople = async (queryText) => {
    if (queryText === '') {
        return null
    } else {
        let result = await fetch('/search/search-people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ queryText }),
        })
            .then((res) => res.json())
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.log('Error in searching people: ', err)
            })
        return result
    }
}

// create left side group
export const createLeftsideGroup = (data, clicked = true) => {
    let groupChats = document.querySelector('.group-chats')
    groupChats.open ? null : (groupChats.open = true)

    // console.log('data', data)
    let parentDiv = document.createElement('div')
    parentDiv.classList.add('group-child', 'group')
    parentDiv.dataset.id = data.groupId

    let imgDiv = document.createElement('div')
    imgDiv.classList.add('group-img')

    let img = document.createElement('img')
    img.draggable = false
    img.src = data.groupAvatar ? data.groupAvatar : `https://avatar.iran.liara.run/username?username=${data.groupName.replace(/ /g, '+')}`
    img.alt = data.groupName

    imgDiv.appendChild(img)
    parentDiv.appendChild(imgDiv)

    let nameDiv = document.createElement('div')
    nameDiv.classList.add('group-name-parent')

    let name = document.createElement('h4')
    name.classList.add('group-name')
    name.textContent = data.groupName

    let username = document.createElement('h4')
    username.classList.add('group-description')
    username.textContent = data.groupDescription

    nameDiv.appendChild(name)
    nameDiv.appendChild(username)
    parentDiv.appendChild(nameDiv)

    let badgeDiv = `
	<div class="unread-badge right-8 hidden">
        <div class="badge bg-secondary text-white">0</div>
    </div>`

    parentDiv.innerHTML += DOMPurify.sanitize(badgeDiv)

    let allGroupChats = document.querySelector('.group-chats')
    allGroupChats.appendChild(parentDiv)

    if (clicked) {
        groupChatClicked(parentDiv, data)
    }

    return parentDiv
}

// Group chat clicked
export const groupChatClicked = (htmlElement, ...args) => {
    // console.log('htmlElement', htmlElement)

    // remove active class from previous chat
    document.querySelector('.chat-child.active') ? document.querySelector('.chat-child.active').classList.remove('active') : null
    document.querySelector('.group-child.active') ? document.querySelector('.group-child.active').classList.remove('active') : null
    htmlElement.classList.add('active')

    // reset unread status
    let unreadElement = htmlElement.children[2]
    unreadElement.children[0].textContent = 0
    unreadElement.classList.contains('hidden') ? null : unreadElement.classList.add('hidden')

    let clickedGroupId = htmlElement.dataset.id
    let clickedGroup = {}

    if (args[0] && args[0].groupId === clickedGroupId) {
        clickedGroup = args[0]
    } else {
        clickedGroup = {
            groupId: clickedGroupId,
            groupName: htmlElement.querySelector('.group-name').innerText,
            groupDescription: htmlElement.querySelector('.group-description').innerText,
            groupAvatar: htmlElement.querySelector('.group-img img').src,
        }
    }

    handleGroupChatHeadAndEnd(clickedGroup)
    handleGroupChat(clickedGroup)
}

export const handleGroupChatHeadAndEnd = (clickedGroup) => {
    let chat_head = document.getElementById('chats-head')
    let chat_mid = document.getElementById('all-chats')
    let chat_end = document.getElementById('chats-end')
    let chat_head_name = document.getElementById('chat-head-name')
    let chat_head_img = document.getElementById('chat-head-img')
    let to_user_info_popup = document.getElementById('to-user-info-popup')

    chat_head.classList.contains('hidden') ? chat_head.classList.remove('hidden') : null
    chat_mid.classList.contains('hidden') ? chat_mid.classList.remove('hidden') : null
    chat_end.classList.contains('hidden') ? chat_end.classList.remove('hidden') : null

    chat_head_name.textContent = clickedGroup.groupName
    chat_head_img.src = clickedGroup.groupAvatar
    to_user_info_popup.querySelector('#to-user-info-popup-name').textContent = clickedGroup.groupName
    to_user_info_popup.querySelector('#to-user-info-popup-username').textContent = clickedGroup.groupDescription
    to_user_info_popup.querySelector('#to-user-info-popup-img').src = clickedGroup.groupAvatar
        ? clickedGroup.groupAvatar
        : `https://avatar.iran.liara.run/username?username=${clickedUser.groupName.replace(/ /g, '+')}`

    chat_head.querySelector('.avatar').classList.contains('online') ? chat_head.querySelector('.avatar').classList.remove('online') : null

    let toUserInfoPopupOptions = document.querySelector('.to-user-info-popup-options')
    toUserInfoPopupOptions.classList.contains('hidden') ? null : toUserInfoPopupOptions.classList.add('hidden')

    let groupInfoPopupOptions = document.querySelector('.group-info-popup-options')
    groupInfoPopupOptions.classList.contains('hidden') ? groupInfoPopupOptions.classList.remove('hidden') : null

    // show copy grp link btn
    let copyBtn = document.querySelector('#copy-group-link-btn')
    copyBtn.classList.contains('hidden') ? copyBtn.classList.remove('hidden') : null
}

// send fetch request to get group conversation
export const handleGroupChat = (clickedGroup) => {
    let chatSection = document.querySelector('.chat-section')
    chatSection.classList.contains('hidden') ? chatSection.classList.remove('hidden') : null

    let toUserProfileSecImg = document.querySelector('.to-user-profile-sec-img img')
    toUserProfileSecImg.src = clickedGroup.groupAvatar
        ? clickedGroup.groupAvatar
        : `https://avatar.iran.liara.run/username?username=${clickedGroup.groupName.replace(/ /g, '+')}`

    let _groupName = document.querySelector('.to-user-profile-sec-name h1')
    let _groupDescription = document.querySelector('.to-user-profile-sec-name h3')
    _groupName.textContent = clickedGroup.groupName
    _groupDescription.textContent = clickedGroup.groupDescription
    _groupDescription.parentElement.dataset.tip = clickedGroup.groupDescription

    // fetch conversation msgs
    fetch('/group-chat-api/get-group-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groupId: clickedGroup.groupId,
        }),
    })
        .then((res) => res.json())
        .then((groupData) => {
            handleHtmlGroupConversation(groupData)
        })
        .catch((err) => {
            console.log('Error in getting conversation: ', err)
        })
}

// show the group conversation
export const handleHtmlGroupConversation = (groupData) => {
    let { requesterId, groupMessages } = groupData

    let msgContainerDiv = document.querySelector('.message-container')

    if (groupMessages.length === 0) {
        msgContainerDiv.textContent = ''
        return
    } else {
        msgContainerDiv.textContent = ''
        let date = ''
        groupMessages = groupMessages.filter((msg) => msg !== null)
        groupMessages.forEach((msg) => {
            // create date
            let msgDate = utcToLocal(msg.createdAt).slice(6)
            let msgTime = utcToLocal(msg.createdAt).slice(0, 5)
            if (msgDate !== date) {
                date = msgDate
                let dayDiv = document.createElement('div')
                dayDiv.classList.add('day')
                let dateDiv = document.createElement('div')
                dateDiv.classList.add('date')
                let dateh1 = document.createElement('h1')
                dateh1.textContent = msgDate

                dateDiv.appendChild(dateh1)
                dayDiv.appendChild(dateDiv)
                msgContainerDiv.appendChild(dayDiv)
            }

            // message here
            if (msg.senderId === requesterId) {
                let fromUserGroupMsg = fromUserGroupMsgComponent(msg.message, msg._id, msgTime, msg.senderName)
                msgContainerDiv.appendChild(fromUserGroupMsg)
            } else {
                let toUserGroupMsg = toUserGroupMsgComponent(msg.message, msg._id, msgTime, msg.senderName)

                msgContainerDiv.appendChild(toUserGroupMsg)
            }
        })
        msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
    }
}

export const fromUserGroupMsgComponent = (msg, msgId, time, name) => {
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
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <h3 class="msg-sender-name text-base font-medium text-black">${name}</h3>
                <h4 class="msg-sending-time text-sm font-normal text-black">${time}</h4>
            </div>
            <p class="msg-content py-1 text-base font-semibold text-black">${msg}</p>
        </div>
    `

    return component
}

export const toUserGroupMsgComponent = (msg, msgId, time, name) => {
    let component = document.createElement('div')
    component.classList.add('to-user-msg')
    component.dataset.id = msgId
    component.innerHTML = `
        <div id="to-user-msg-container" class="msg-container">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <h3 class="msg-sender-name text-base font-medium text-black">${name}</h3>
                <h4 class="msg-sending-time text-sm font-normal text-black">${time}</h4>
            </div>
            <p class="msg-content py-2.5 text-base font-semibold text-black">${msg}</p>
        </div>
    `
    return component
}

// send group message
export const handleSendRequestGroup = (groupId, msg) => {
    fetch('/group-chat-api/send-group-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groupId,
            msg,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            const { _id, message, createdAt } = data.msgInfo

            let senderName = document.querySelector('#change-details-name').value

            let msgContainerDiv = document.querySelector('.message-container')

            let date = utcToLocal(createdAt)
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

            let fromUserGroupMsg = fromUserGroupMsgComponent(message, _id, msgTime, senderName)

            msgContainerDiv.appendChild(fromUserGroupMsg)

            msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
        })
}

// delete group message
export const deleteGroupMessage = (msg) => {
    let msgId = msg.dataset.id
    let groupId = document.querySelector('.group-child.active').dataset.id

    fetch('/group-chat-api/delete-group-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groupId,
            msgId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
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
            console.log('Error in deleting group message: ', err)
        })
}

// group member component
export const groupMemberComponent = (member) => {
    let component = document.createElement('div')
    component.classList.add('group-member', 'group')
    component.dataset.id = member.encryptedId
    component.innerHTML = `
        <img draggable="false" class="group-member-avatar h-10 w-10 rounded-full" src="${member.avatar}" alt="${member.username}" />
        <div class="group-memeber-name-parent w-4/5 pl-2">
            <h3 
                class="group-member-name overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-sm font-semibold text-white group-hover:text-black"
            >
                ${member.name}
            </h3>
            <h4
                class="group-member-username overflow-hidden text-ellipsis whitespace-nowrap pl-2 text-xs font-medium text-white group-hover:text-black"
            >
                ${member.username}
            </h4>
        </div>
    `

    return component
}
