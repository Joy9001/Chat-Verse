function getTime() {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes

    let time = hours + ':' + minutes
    return time
}

const utcToLocal = (utcDate) => {
    const date = new Date(utcDate)

    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    const day = date.getDate().toString()
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return `${hours}:${minutes} ${day} ${month}, ${year}`
}

const handleChatHeadAndEnd = (parsedElement, isOnline) => {
    let chat_mid = document.getElementById('all-chats')
    let chat_end = document.getElementById('chats-end')
    let chat_head = document.getElementById('chats-head')
    let chat_head_name = document.getElementById('chat-head-name')
    let chat_head_img = document.getElementById('chat-head-img')
    let to_user_info_popup = document.getElementById('to-user-info-popup')

    chat_end.classList.remove('hidden')
    chat_head.classList.remove('hidden')
    chat_mid.classList.remove('hidden')
    chat_head_name.innerText = parsedElement.name
    chat_head_img.src = parsedElement.avatar
        ? parsedElement.avatar
        : `https://avatar.iran.liara.run/username?username=${parsedElement.name.replace(' ', '+')}`
    to_user_info_popup.children[0].children[1].children[0].innerText = parsedElement.name
    to_user_info_popup.children[0].children[1].children[1].innerText = parsedElement.username
    to_user_info_popup.children[0].children[0].src = parsedElement.avatar
        ? parsedElement.avatar
        : `https://avatar.iran.liara.run/username?username=${parsedElement.name.replace(' ', '+')}`

    if (isOnline) {
        chat_head.children[0].children[0].children[0].classList.remove('hidden')
    } else {
        chat_head.children[0].children[0].children[0].classList.add('hidden')
    }
}

const handleHtmlConversation = (data) => {
    // let chatSection = document.querySelector(".message-container");
    let msgContainerDiv = document.querySelector('.message-container')

    const currentUserId = atob(document.body.dataset.currentUserId)
    // console.log("Data: ", data);

    if (data.messages.length === 0) {
        msgContainerDiv.innerHTML = ''
        return
    } else {
        // console.log("Creating new conversation", data.messages);
        msgContainerDiv.innerHTML = ''
        let date = ''
        data.messages = data.messages.filter((msg) => msg !== null)
        data.messages.forEach((msg) => {
            // console.log("Message: ", msg);
            let msgDate = utcToLocal(msg.createdAt)
            if (msgDate.slice(6) !== date) {
                date = utcToLocal(msg.createdAt).slice(6)
                const dayDiv = document.createElement('div')
                dayDiv.classList.add('day')
                const dateDiv = document.createElement('div')
                dateDiv.classList.add('date')
                const dateh1 = document.createElement('h1')
                dateh1.innerText = date

                dateDiv.appendChild(dateh1)
                dayDiv.appendChild(dateDiv)
                msgContainerDiv.appendChild(dayDiv)
            }

            if (msg.senderId === currentUserId) {
                const msgDiv = document.createElement('div')
                msgDiv.classList.add('from-user-msg')
                msgDiv.dataset.id = msg._id
                msgDiv.innerHTML = `
						<div class="pr-2 delete-msg-btn hidden" onclick="deleteMessege(this)">
							<button class="btn btn-circle btn-outline border-[#4b2138] bg-[#E9E9E9] hover:bg-[#4B2138] hover:border-[#e9e9e9] h-6 w-6 min-h-4 group">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:stroke-[#E9E9E9]" fill="none" viewBox="0 0 24 24" stroke="#4B2138"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
							</button>
						</div>
						<div class="msg-container">
							<p>${msg.message}</p>
							<span>${msgDate.slice(0, 5)}</span>
						</div>
					`

                msgContainerDiv.appendChild(msgDiv)
            } else {
                const msgDiv = document.createElement('div')
                msgDiv.classList.add('to-user-msg')
                msgDiv.dataset.id = msg._id
                msgDiv.innerHTML = `
					<div class="msg-container">
						<p>${msg.message}</p>
						<span>${msgDate.slice(0, 5)}</span>
					</div>
					<div class="pl-2 delete-msg-btn hidden" onclick="deleteMessege(this)">
						<button class="btn btn-circle btn-outline border-[#e9e9e9] bg-[#4B2138] hover:bg-[#e9e9e9] hover:border-[#4b2138] h-6 w-6 min-h-4 group">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:stroke-[#4B2138]" fill="none" viewBox="0 0 24 24" stroke="#e9e9e9"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
						</button>
					</div>
				`

                msgContainerDiv.appendChild(msgDiv)
            }
        })
        msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
    }
}

const handleConversation = (receiverId) => {
    let chat_end = document.getElementById('chats-end')

    const currentUserId = atob(document.body.dataset.currentUserId)
    fetch('/get-conv-api/get-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId: currentUserId, receiverId }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('data', data)
            let isBlocked = data.isBlocked
            let blockedBy = data.blockedBy
            if (isBlocked) {
                chat_end.classList.add('hidden')
                let blockDiv = document.querySelector('#chats-end-block')
                blockDiv.classList.remove('hidden')
            }

            if (blockedBy === currentUserId) {
                let blockBtnChild = document.querySelector('#block-to-user').children[0]
                blockBtnChild.innerText = 'Unblock'
            } else if (blockedBy !== null) {
                let blockBtn = document.querySelector('#block-to-user')
                blockBtn.classList.add('hidden')

                let deleteChatBtn = document.querySelector('#delete-chat-to-user')
                deleteChatBtn.classList.add('hidden')

                let blockInfoDiv = document.createElement('div')
                blockInfoDiv.classList.add('block-info')
                blockInfoDiv.innerHTML = `
					<h3>You have been blocked</h3>
				`

                let toUserInfoPopupOptions = document.querySelector('.to-user-info-popup-options')
                toUserInfoPopupOptions.appendChild(blockInfoDiv)
            }
            handleHtmlConversation(data)
        })
}

const handleChats = (parsedElement) => {
    let toUserProfileSecImgDiv = document.querySelector('.to-user-profile-sec-img')
    let toUserProfileSecImg = toUserProfileSecImgDiv.children[0]
    toUserProfileSecImg.src = parsedElement.avatar
        ? parsedElement.avatar
        : `https://avatar.iran.liara.run/username?username=${parsedElement.name.replace(' ', '+')}`

    let toUserProfileSecNameDiv = document.querySelector('.to-user-profile-sec-name')
    let toUserProfileSecName = toUserProfileSecNameDiv.children[0]
    let toUserProfileSecUsername = toUserProfileSecNameDiv.children[1]
    toUserProfileSecName.innerText = parsedElement.name
    toUserProfileSecUsername.innerText = parsedElement.username

    let receiverId = parsedElement._id

    handleConversation(receiverId)
}

const chatClicked = (htmlElement) => {
    let all_chats_children = document.getElementById('chat-parent').children
    let chatSection = document.querySelector('.chat-section')

    let unreadElement = htmlElement.children[2]
    unreadElement.children[0].innerText = 0
    unreadElement.classList.contains('hidden') ? null : unreadElement.classList.add('hidden')

    const element = htmlElement.dataset.element
    const parsedElement = JSON.parse(atob(element))
    // console.log(parsedElement.name);

    for (let i = 0; i < all_chats_children.length; i++) {
        if (all_chats_children[i].classList.contains('active')) {
            all_chats_children[i].classList.remove('active')
        }
    }

    let isOnline = false
    let statusElement = htmlElement.children[0].children[0]
    if (!statusElement.classList.contains('hidden')) {
        isOnline = true
    }
    handleChatHeadAndEnd(parsedElement, isOnline)

    htmlElement.classList.add('active')
    if (chatSection.classList.contains('hidden')) chatSection.classList.remove('hidden')

    handleChats(parsedElement)
}

function addActive(ele) {
    ele.classList.add('active')
}

document.querySelector('#transparent-modal').addEventListener('click', () => {
    let add_people_btn = document.getElementById('add-chat-btn')
    let add_people_popup = document.getElementById('add-chat-popup')
    let overlay = document.querySelector('#transparent-modal')
    let to_user_info_popup = document.getElementById('to-user-info-popup')
    let to_user_info_btn = document.getElementById('to-user-info-btn')
    let emoji_popup = document.getElementById('emoji-popup')

    overlay.classList.add('hidden')
    add_people_btn.classList.remove('active')
    to_user_info_btn.classList.remove('active')
    add_people_popup.classList.add('hidden')
    to_user_info_popup.classList.add('hidden')
    emoji_popup.classList.add('hidden')
    if (add_people_btn.classList.contains('z-30')) {
        add_people_btn.classList.remove('z-30')
    }
})

document.getElementById('add-chat-btn').addEventListener('click', (event) => {
    // event.stopPropagation()
    let add_people_btn = document.getElementById('add-chat-btn')
    let add_people_popup = document.getElementById('add-chat-popup')
    let add_people_list = document.querySelector('.popup-people-all')
    let popup_search = document.getElementById('popup-search')
    let overlay = document.querySelector('#transparent-modal')

    fetch('/message/get-people-to-add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentUserId: atob(document.body.dataset.currentUserId) }),
    })
        .then((res) => res.json())
        .then((data) => {
            const people_list = document.querySelector('.popup-people-all')
            people_list.innerHTML = ''
            console.log(data.people)
            data.people.forEach((person) => {
                const peopleInnerHtml = `
				<div class="popup-people" data-id="${btoa(person._id)}" data-element="${btoa(JSON.stringify(person))}" onclick="addPeopleToChat(this)">
					<img src="${person.avatar ? person.avatar : `https://avatar.iran.liara.run/username?username=${person.name.replace(' ', '+')}`}" alt="${person.name}">
					<h3>${person.name}</h3>
				</div>
				`
                people_list.innerHTML += peopleInnerHtml
            })
        })
        .catch((error) => {
            console.log('Error getting people when clicked add-chat-btn', error)
        })
    // document.body.style.overflow = "hidden";
    add_people_btn.classList.toggle('active')
    add_people_btn.classList.toggle('z-30')

    if (add_people_popup.classList.contains('hidden')) {
        add_people_popup.classList.remove('hidden')
        overlay.classList.remove('hidden')
        popup_search.focus()
        add_people_list.scrollTop = 0
    } else {
        add_people_popup.classList.add('hidden')
        overlay.classList.add('hidden')
    }
})

const createLeftsidePeople = (data) => {
    let parentDiv = document.createElement('div')
    parentDiv.classList.add('chat-child')
    parentDiv.dataset.element = btoa(JSON.stringify(data))
    parentDiv.onclick = () => chatClicked(parentDiv)

    let imgDiv = document.createElement('div')
    imgDiv.classList.add('chats_img')
    imgDiv.classList.add('indicator')

    let statusDiv = `<span class="indicator-item badge badge-success h-2 p-[0.4rem] translate-x-[5%] translate-y-[10%] hidden status"></span>`

    let img = document.createElement('img')
    img.src = data.avatar
        ? data.avatar
        : `https://avatar.iran.liara.run/username?username=${data.name.replace(' ', '+')}`
    img.alt = data.name

    imgDiv.innerHTML = statusDiv
    imgDiv.appendChild(img)
    parentDiv.appendChild(imgDiv)

    let nameDiv = document.createElement('div')
    nameDiv.classList.add('chat-name-parent')

    let name = document.createElement('h4')
    name.classList.add('chat-name')
    name.innerText = data.name

    nameDiv.appendChild(name)
    parentDiv.appendChild(nameDiv)

    let badgeDiv = `
	<div class="unread-badge absolute right-8 hidden">
        <div class="badge badge-accent">0</div>
    </div>`

    parentDiv.innerHTML += badgeDiv

    let all_chats = document.getElementById('chat-parent')
    all_chats.appendChild(parentDiv)

    chatClicked(parentDiv)
    handleHtmlOnlineUsers(atob(onlineUsers))
}

const addPeopleToChat = (event) => {
    let leftPeople = document.querySelectorAll('.chat-child')
    let alreadyThere = false
    let clickedPerson = ''

    leftPeople.forEach((person) => {
        let data = JSON.parse(atob(person.dataset.element))
        if (data._id === atob(event.dataset.id)) {
            alreadyThere = true
            clickedPerson = person
        }
    })

    if (!alreadyThere) {
        const currentUserId = atob(document.body.dataset.currentUserId)
        fetch('/add-people-api/add-people-to-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: currentUserId,
                receiverId: atob(event.dataset.id),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === 'Added people to chat') {
                    createLeftsidePeople(data.newPeople)
                    // console.log(data.newPeople);
                }
            })
            .catch((error) => {
                console.log('Error getting people', error)
            })
    } else {
        chatClicked(clickedPerson)
        // console.log("Online users here", atob(onlineUsers));
    }

    document.querySelector('#transparent-modal').click()
}

document.getElementById('to-user-info-btn').addEventListener('click', () => {
    let overlay = document.querySelector('#transparent-modal')
    let to_user_info_popup = document.getElementById('to-user-info-popup')
    let to_user_info_btn = document.getElementById('to-user-info-btn')

    if (to_user_info_popup.classList.contains('hidden')) {
        to_user_info_popup.classList.remove('hidden')
        overlay.classList.remove('hidden')
        to_user_info_btn.classList.add('active')
    } else {
        to_user_info_popup.classList.add('hidden')
        overlay.classList.add('hidden')
        to_user_info_btn.classList.remove('active')
    }
})

const handleHtmlSend = (msgRes) => {
    // let chatSection = document.querySelector(".message-container");
    let msgContainerDiv = document.querySelector('.message-container')

    let date = utcToLocal(msgRes.createdAt)
    let msgDate = date.slice(6)
    let msgTime = date.slice(0, 5)

    let dates = document.querySelectorAll('.date')

    if (dates.length === 0 || dates[dates.length - 1].innerText !== msgDate) {
        const dayDiv = document.createElement('div')
        dayDiv.classList.add('day')
        const dateDiv = document.createElement('div')
        dateDiv.classList.add('date')
        const dateh1 = document.createElement('h1')
        dateh1.innerText = msgDate

        dateDiv.appendChild(dateh1)
        dayDiv.appendChild(dateDiv)
        msgContainerDiv.appendChild(dayDiv)
    }

    let msg_div = document.createElement('div')
    msg_div.classList.add('from-user-msg')
    msg_div.dataset.id = msgRes._id
    msg_div.innerHTML = `
		<div class="pr-2 delete-msg-btn hidden" onclick="deleteMessege(this)">
			<button class="btn btn-circle btn-outline border-[#4b2138] bg-[#E9E9E9] hover:bg-[#4B2138] hover:border-[#e9e9e9] h-6 w-6 min-h-4 group">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:stroke-[#E9E9E9]" fill="none" viewBox="0 0 24 24" stroke="#4B2138"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
			</button>
		</div>
		<div class="msg-container">
			<p>${msgRes.message}</p>
			<span>${msgTime}</span>
		</div>
	`
    msgContainerDiv.appendChild(msg_div)
    msgContainerDiv.scrollTop = msgContainerDiv.scrollHeight
}

const handleSendRequest = (receiverId, msg) => {
    const currentUserId = atob(document.body.dataset.currentUserId)
    fetch('/message/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderId: currentUserId,
            receiverId: receiverId,
            message: msg,
        }),
    })
        .then((res) => {
            // console.log(res);
            return res.json()
        })
        .then((data) => {
            handleHtmlSend(data)
        })
}

document.getElementById('send-btn').addEventListener('click', (e) => {
    e.preventDefault()
    let msgInput = document.getElementById('msg-input')

    let raw_msg = msgInput.value
    let msg = raw_msg.replace(/\n/g, '<br>')
    msgInput.value = ''
    msgInput.focus()

    if (msg.length > 0) {
        let receiverData = JSON.parse(atob(document.querySelector('.chat-child.active').dataset.element))
        let receiverId = receiverData._id
        handleSendRequest(receiverId, msg)
    }
})

document.getElementById('msg-input').addEventListener('keydown', (event) => {
    let msgInput = document.getElementById('msg-input')

    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()

        let raw_msg = msgInput.value
        let msg = raw_msg.replace(/\n/g, '<br>')
        msgInput.value = ''
        msgInput.focus()

        if (msg.length > 0) {
            let receiverData = JSON.parse(atob(document.querySelector('.chat-child.active').dataset.element))
            let receiverId = receiverData._id
            handleSendRequest(receiverId, msg)
        }
    } else if (event.shiftKey && event.key === 'Enter') {
        const start = msgInput.selectionStart
        const end = msgInput.selectionEnd
        const textBefore = msgInput.value.substring(0, start)
        const textAfter = msgInput.value.substring(end)
        if (textAfter === '') {
            msgInput.value = textBefore + '\n'
        } else {
            msgInput.value = textBefore + '\n' + textAfter
        }

        msgInput.selectionStart = msgInput.selectionEnd = start
    }
})

const deleteMessege = (btn) => {
    let parent = btn.parentElement
    let sibling = ''

    if (parent.classList.contains('from-user-msg')) {
        sibling = btn.nextElementSibling
    } else {
        sibling = btn.previousElementSibling
    }
    let msgId = parent.dataset.id
    console.log('msgId', msgId)
    let receiverData = JSON.parse(atob(document.querySelector('.chat-child.active').dataset.element))
    let receiverId = receiverData._id

    fetch('/message/delete-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderId: atob(document.body.dataset.currentUserId),
            receiverId,
            msgId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message)
            if (data.message === 'Message deleted') {
                parent.remove()
                let days = document.querySelectorAll('.day')
                days.forEach((day) => {
                    if (day.nextElementSibling === null) {
                        day.remove()
                    }
                })
                let alert = document.querySelector('.alert')
                alert.classList.remove('hidden')
                setTimeout(() => {
                    alert.classList.add('hidden')
                }, 5000)
            }
        })
}

const deleteConversation = () => {
    let chat_mid = document.getElementById('all-chats')
    let chat_end = document.getElementById('chats-end')
    let chat_head = document.getElementById('chats-head')
    let blockDiv = document.querySelector('#chats-end-block')

    let receiver = document.querySelector('.chat-child.active')
    let receiverData = JSON.parse(atob(receiver.dataset.element))
    let receiverId = receiverData._id

    fetch('/message/delete-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderId: atob(document.body.dataset.currentUserId),
            receiverId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message)
            if (data.message === 'Conversation deleted') {
                receiver.classList.remove('active')
                receiver.classList.add('hidden')
                chat_head.classList.add('hidden')
                chat_mid.classList.add('hidden')
                chat_end.classList.add('hidden')
                blockDiv.classList.add('hidden')
            }
        })
}

const handleBlockUser = (currentUserId, receiverId, htmlElement) => {
    let chat_end = document.getElementById('chats-end')
    let blockDiv = document.querySelector('#chats-end-block')

    fetch('/message/block-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderId: currentUserId,
            receiverId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message)
            if (data.message === 'User blocked') {
                htmlElement.children[0].innerText = 'Unblock'
                chat_end.classList.add('hidden')
                blockDiv.classList.remove('hidden')
            }
        })
}

const handleUnblockUser = (currentUserId, receiverId, htmlElement) => {
    let chat_end = document.getElementById('chats-end')
    let blockDiv = document.querySelector('#chats-end-block')

    fetch('/message/unblock-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderId: currentUserId,
            receiverId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.message)
            if (data.message === 'User unblocked') {
                htmlElement.children[0].innerText = 'Block'
                blockDiv.classList.add('hidden')
                chat_end.classList.remove('hidden')
            }
        })
}

const blockUnblockUser = (htmlElement) => {
    let receiver = document.querySelector('.chat-child.active')
    let receiverData = JSON.parse(atob(receiver.dataset.element))
    let receiverId = receiverData._id
    let currentUserId = atob(document.body.dataset.currentUserId)

    let blockStatus = htmlElement.children[0].innerText

    if (blockStatus === 'Block') {
        handleBlockUser(currentUserId, receiverId, htmlElement)
    } else {
        handleUnblockUser(currentUserId, receiverId, htmlElement)
    }
}

const searchPeople = (event) => {
    let queryText = event.target.value.toLowerCase()
    let add_people = document.querySelectorAll('.popup-people')

    if (queryText === '') {
        add_people.forEach((person) => {
            person.classList.remove('hidden')
        })
        return
    } else {
        fetch('/search/search-people', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ queryText }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("data.people: ", data.people);
                add_people.forEach((person) => {
                    let personId = atob(person.dataset.id)
                    let personData = data.people.find((person) => person._id === personId)
                    if (personData) {
                        person.classList.remove('hidden')
                    } else {
                        person.classList.add('hidden')
                    }
                })
            })
    }
}

document.getElementById('popup-search').addEventListener('keyup', (event) => searchPeople(event))

document.querySelector('#change-profilePic-btn').addEventListener('click', () => {
    const modalProfilePic = document.querySelector('#change-details-profilePic')

    const gender = document.querySelector('#change-details-gender option:checked').value
    console.log(gender)

    fetch('/api/get-avatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gender }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.avatar)
            // console.log(modalProfilePic.src);
            modalProfilePic.src = data.avatar
        })
        .catch((error) => console.log(error.message))
})

document.querySelector('#chat-change-details-done-btn').addEventListener('click', () => {
    //~ TODO: Implement the logic when no changes are made (retrieve the current values from cookies and compare with the new values)

    const id = atob(document.body.dataset.currentUserId)
    const name = document.querySelector('#change-details-name').value
    const username = document.querySelector('#change-details-username').value
    const gender = document.querySelector('#change-details-gender option:checked').value
    const avatar = document.querySelector('#change-details-profilePic').src

    fetch('/api/change-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, username, gender, avatar }),
    })
        .then((res) => res.json())
        .then((data) => {
            document.querySelector('#change-details-response').classList.remove('hidden')
            document.querySelector('#change-details-response span').textContent = data.message
            if (data.success) {
                document.querySelector('#from-user-modal-img').src = avatar
            }
            setTimeout(() => {
                document.querySelector('#change-details-response span').textContent = ''
                document.querySelector('#change-details-response').classList.add('hidden')
            }, 5000)
        })
})
