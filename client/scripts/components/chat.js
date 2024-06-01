const getTime = () => {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes

    let time = hours + ':' + minutes
    return time
}

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

const handleChatHeadAndEnd = (clickedUser, isOnline) => {
    let chat_mid = document.getElementById('all-chats')
    let chat_end = document.getElementById('chats-end')
    let chat_head = document.getElementById('chats-head')
    let chat_head_name = document.getElementById('chat-head-name')
    let chat_head_img = document.getElementById('chat-head-img')
    let to_user_info_popup = document.getElementById('to-user-info-popup')

    chat_end.classList.remove('hidden')
    chat_head.classList.remove('hidden')
    chat_mid.classList.remove('hidden')
    chat_head_name.innerText = clickedUser.name
    chat_head_img.src = clickedUser.avatar
        ? clickedUser.avatar
        : `https://avatar.iran.liara.run/username?username=${clickedUser.name.replace(' ', '+')}`
    to_user_info_popup.children[0].children[1].children[0].innerText = clickedUser.name
    to_user_info_popup.children[0].children[1].children[1].innerText = clickedUser.username
    to_user_info_popup.children[0].children[0].src = clickedUser.avatar
        ? clickedUser.avatar
        : `https://avatar.iran.liara.run/username?username=${clickedUser.name.replace(' ', '+')}`

    if (isOnline) {
        chat_head.children[0].children[0].children[0].classList.remove('hidden')
    } else {
        chat_head.children[0].children[0].children[0].classList.add('hidden')
    }
}

const handleHtmlConversation = (data) => {
    // let chatSection = document.querySelector(".message-container");
    let msgContainerDiv = document.querySelector('.message-container')

    const currentUserId = data.senderId
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

    fetch('/get-conv-api/get-conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverId }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('data', data)
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
                blockBtnChild.innerText = 'Unblock'
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
                toUserInfoPopupOptions.appendChild(blockInfoDiv)
            }
            handleHtmlConversation(data)
        })
}

const handleChats = (clickedUser) => {
    let toUserProfileSecImgDiv = document.querySelector('.to-user-profile-sec-img')
    let toUserProfileSecImg = toUserProfileSecImgDiv.children[0]
    toUserProfileSecImg.src = clickedUser.avatar
        ? clickedUser.avatar
        : `https://avatar.iran.liara.run/username?username=${clickedUser.name.replace(' ', '+')}`

    let toUserProfileSecNameDiv = document.querySelector('.to-user-profile-sec-name')
    let toUserProfileSecName = toUserProfileSecNameDiv.children[0]
    let toUserProfileSecUsername = toUserProfileSecNameDiv.children[1]
    toUserProfileSecName.innerText = clickedUser.name
    toUserProfileSecUsername.innerText = clickedUser.username

    let receiverId = clickedUser._id

    handleConversation(receiverId)
}

window.chatClicked = async (htmlElement) => {
    let all_chats_children = document.getElementById('chat-parent').children
    let chatSection = document.querySelector('.chat-section')

    let unreadElement = htmlElement.children[2]
    unreadElement.children[0].innerText = 0
    unreadElement.classList.contains('hidden') ? null : unreadElement.classList.add('hidden')

    const clickedUserUsername = htmlElement.children[1].children[1].innerText
    let clickedUser = ''

    await fetch('/get-conv-api/user-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: clickedUserUsername }),
    })
        .then((res) => res.json())
        .then((data) => {
            clickedUser = data
        })

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
    handleChatHeadAndEnd(clickedUser, isOnline)

    htmlElement.classList.add('active')
    if (chatSection.classList.contains('hidden')) chatSection.classList.remove('hidden')

    handleChats(clickedUser)
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

    let username = document.createElement('h4')
    username.classList.add('chat-username')
    username.innerText = data.username

    nameDiv.appendChild(name)
    nameDiv.appendChild(username)
    parentDiv.appendChild(nameDiv)

    let badgeDiv = `
	<div class="unread-badge absolute right-8 hidden">
        <div class="badge badge-accent">0</div>
    </div>`

    parentDiv.innerHTML += badgeDiv

    let all_chats = document.getElementById('chat-parent')
    all_chats.appendChild(parentDiv)

    chatClicked(parentDiv)
    handleHtmlOnlineUsers(onlineUsers)
}

window.addPeopleToChat = async (event) => {
    let leftPeople = document.querySelectorAll('.chat-child')
    let alreadyThere = false
    let clickedPerson = ''
    console.log(event.children[1].children)
    const eventUsername = event.children[1].children[1].innerText

    let eventData = await fetch('/get-conv-api/user-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: eventUsername }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data
        })

    leftPeople.forEach((person) => {
        let personUsername = person.children[1].children[1].innerText
        if (personUsername === eventData.username) {
            alreadyThere = true
            clickedPerson = person

            if (person.classList.contains('hidden')) {
                person.classList.remove('hidden')
            }
        }
    })

    console.log('alreadyThere', alreadyThere)
    if (!alreadyThere) {
        fetch('/add-people-api/add-people-to-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                receiverId: eventData._id,
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
        console.log('clickedPerson', clickedPerson)
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

const handleSendRequest = async (receiverUsername, msg) => {
    let receiverId = await fetch('/get-conv-api/user-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: receiverUsername }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data._id
        })

    fetch('/chat/send-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        let receiverUsername = document.querySelector('.chat-child.active').children[1].children[1].innerText
        handleSendRequest(receiverUsername, msg)
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
            let receiverUsername = document.querySelector('.chat-child.active').children[1].children[1].innerText
            handleSendRequest(receiverUsername, msg)
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

window.deleteMessege = async (btn) => {
    let parent = btn.parentElement
    let sibling = ''

    if (parent.classList.contains('from-user-msg')) {
        sibling = btn.nextElementSibling
    } else {
        sibling = btn.previousElementSibling
    }
    let msgId = parent.dataset.id
    console.log('msgId', msgId)
    let receiverUsername = document.querySelector('.chat-child.active').children[1].children[1].innerText

    let receiverId = await fetch('/get-conv-api/user-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: receiverUsername }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data._id
        })

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
                alert.children[1].innerHTML = 'Message deleted for both'
                alert.classList.remove('hidden')
                setTimeout(() => {
                    alert.classList.add('hidden')
                }, 5000)
            }
        })
}

window.deleteConversation = async () => {
    let chat_mid = document.getElementById('all-chats')
    let chat_end = document.getElementById('chats-end')
    let chat_head = document.getElementById('chats-head')
    let blockDiv = document.querySelector('#chats-end-block')

    let receiver = document.querySelector('.chat-child.active')
    let receiverUsername = receiver.children[1].children[1].innerText
    let receiverId = await fetch('/get-conv-api/user-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: receiverUsername }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data._id
        })

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
            console.log(data.message)
            if (data.message === 'Conversation deleted') {
                // receiver.classList.remove('active')
                // receiver.classList.add('hidden')
                receiver.remove()
                chat_head.classList.add('hidden')
                chat_mid.classList.add('hidden')
                chat_end.classList.add('hidden')
                blockDiv.classList.add('hidden')

                let alert = document.querySelector('.alert')
                alert.children[1].innerHTML = 'Conversation deleted'
                alert.classList.remove('hidden')

                setTimeout(() => {
                    alert.classList.add('hidden')
                }, 5000)
            }
        })
}

const handleBlockUser = (receiverId, htmlElement) => {
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
            console.log(data.message)
            if (data.message === 'User blocked') {
                htmlElement.children[0].innerText = 'Unblock'
                chat_end.classList.add('hidden')
                blockDiv.classList.remove('hidden')
            }
        })
}

const handleUnblockUser = (receiverId, htmlElement) => {
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
            console.log(data.message)
            if (data.message === 'User unblocked') {
                htmlElement.children[0].innerText = 'Block'
                blockDiv.classList.add('hidden')
                chat_end.classList.remove('hidden')
            }
        })
}

window.blockUnblockUser = async (htmlElement) => {
    let receiver = document.querySelector('.chat-child.active')
    let receiverUsername = receiver.children[1].children[1].innerText
    let receiverId = await fetch('/get-conv-api/user-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: receiverUsername }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data._id
        })

    let blockStatus = htmlElement.children[0].innerText

    if (blockStatus === 'Block') {
        handleBlockUser(receiverId, htmlElement)
    } else {
        handleUnblockUser(receiverId, htmlElement)
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
                    let personUsername = person.querySelector('.popup-people-username').innerText
                    let personData = data.people.find((personData) => personData.username === personUsername)
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

    const name = document.querySelector('#change-details-name').value
    const username = document.querySelector('#change-details-username').value
    const gender = document.querySelector('#change-details-gender option:checked').value
    const avatar = document.querySelector('#change-details-profilePic').src

    fetch('/api/change-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, gender, avatar }),
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

// Refresh access token every 10 minutes
setInterval(
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
            })
            .catch((error) => console.log(error.message))
    },
    1000 * 60 * 5 // 5 minutes
)