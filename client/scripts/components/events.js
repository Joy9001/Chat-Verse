import * as ChatFunctions from './chat.js'
import * as GroupChatFunctions from './groupChat.js'

const addChatPopupInitialState = document.querySelector('#add-chat-popup').innerHTML

//~ chat.js

document.querySelector('#transparent-modal').addEventListener('click', () => {
    let add_people_btn = document.getElementById('add-chat-btn')
    let overlay = document.querySelector('#transparent-modal')
    let to_user_info_popup = document.getElementById('to-user-info-popup')
    let to_user_info_btn = document.getElementById('to-user-info-btn')
    let emoji_popup = document.getElementById('emoji-popup')
    let showGroupMembersBtn = document.querySelector('#all-group-members-btn')

    // close the add user popup
    let addChatPopup = document.getElementById('add-chat-popup')
    if (!addChatPopup.classList.contains('hidden')) {
        addChatPopup.innerHTML = addChatPopupInitialState
        initializeAddChatPopupEventListeners()
        addChatPopup.classList.add('hidden')
    }

    add_people_btn.classList.remove('active')
    to_user_info_btn.classList.remove('active')
    to_user_info_popup.classList.add('hidden')
    emoji_popup.classList.add('hidden')
    if (add_people_btn.classList.contains('z-30')) {
        add_people_btn.classList.remove('z-30')
    }

    showGroupMembersBtn.parentElement.open ? (showGroupMembersBtn.parentElement.open = false) : null

    overlay.classList.add('hidden')
})

document.getElementById('add-chat-btn').addEventListener('click', (event) => {
    // event.stopPropagation()
    let add_people_btn = document.getElementById('add-chat-btn')
    let add_people_popup = document.getElementById('add-chat-popup')
    let add_people_list = document.querySelector('.all-new-chat-people')
    let popup_search = document.getElementById('new-chat-search')
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

document.getElementById('send-btn').addEventListener('click', (e) => {
    e.preventDefault()
    let msgInput = document.getElementById('msg-input')

    let msg = DOMPurify.sanitize(msgInput.value)
    msgInput.value = ''
    msgInput.focus()

    if (msg.length > 0) {
        if (document.querySelector('.chat-child.active')) {
            let receiverId = document.querySelector('.chat-child.active').dataset.id
            ChatFunctions.handleSendRequest(receiverId, msg)
        } else if (document.querySelector('.group-child.active')) {
            let groupId = document.querySelector('.group-child.active').dataset.id
            GroupChatFunctions.handleSendRequestGroup(groupId, msg)
        }
    }
})

document.getElementById('msg-input').addEventListener('keydown', (event) => {
    let msgInput = document.getElementById('msg-input')

    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()

        let msg = DOMPurify.sanitize(msgInput.value)
        msgInput.value = ''
        msgInput.focus()

        if (msg.length > 0) {
            if (document.querySelector('.chat-child.active')) {
                let receiverId = document.querySelector('.chat-child.active').dataset.id
                ChatFunctions.handleSendRequest(receiverId, msg)
            } else if (document.querySelector('.group-child.active')) {
                let groupId = document.querySelector('.group-child.active').dataset.id
                GroupChatFunctions.handleSendRequestGroup(groupId, msg)
            }
        }
    } else if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault()
        const start = msgInput.selectionStart
        const text = msgInput.value

        msgInput.value = text.slice(0, start) + '\n' + text.slice(start)
        msgInput.selectionEnd = start + 1
    }
})

document.querySelector('.message-container').addEventListener('click', (event) => {
    // console.log('event.target', event.target)
    if (event.target.closest('.delete-msg-btn')) {
        const deleteMsgBtn = event.target.closest('.delete-msg-btn')
        const msg = deleteMsgBtn.parentElement
        if (document.querySelector('.chat-child.active')) {
            ChatFunctions.deleteMessage(msg)
        } else if (document.querySelector('.group-child.active')) {
            GroupChatFunctions.deleteGroupMessage(msg)
        }
    }
})

// Delete Conversation
document.querySelector('#delete-chat-to-user').addEventListener('click', () => {
    ChatFunctions.deleteConversation()
})

// Block User
document.querySelector('#block-to-user').addEventListener('click', () => {
    ChatFunctions.blockUnblockUser(document.querySelector('#block-to-user'))
})

document.querySelector('#from-user-modal-img').addEventListener('click', () => {
    my_modal_2.showModal()
})

// Change profile avatar button
document.querySelector('#change-profilePic-btn').addEventListener('click', () => {
    const modalProfilePic = document.querySelector('#change-details-profilePic')

    fetch('/api/get-avatar')
        .then((res) => res.json())
        .then((data) => {
            // console.log(data.avatar)
            // console.log(modalProfilePic.src);
            modalProfilePic.src = data.avatar
        })
        .catch((err) => {
            console.log('Error in getting avatar: ', err)
        })
})

// Change details button
document.querySelector('#chat-change-details-done-btn').addEventListener('click', () => {
    let name = DOMPurify.sanitize(document.querySelector('#change-details-name').value)
    let username = DOMPurify.sanitize(document.querySelector('#change-details-username').value)
    const gender = DOMPurify.sanitize(document.querySelector('#change-details-gender option:checked').value)
    let avatar = document.querySelector('#change-details-profilePic').src
    const csrfToken = DOMPurify.sanitize(document.querySelector('input[name="CSRFToken"]').value)

    fetch('/api/change-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
            name,
            username,
            gender,
            avatar,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                document.querySelector('#from-user-modal-img').src = data.user.avatar
            }

            if (data.message === 'Username already taken') {
                username.textContent = data.user.username
            }

            ChatFunctions.showNotification(data.message)
        })
        .catch((err) => {
            console.log('Error in changing details: ', err)
            ChatFunctions.showNotification('Error in changing details! Please refresh the page and try again.')
        })
})

// add the group member to chat
document.querySelector('.all-group-members').addEventListener('click', (event) => {
    // console.log('event.target', event.target)
    // console.log('event.target.closest', event.target.closest('.group-member'))
    if (event.target.closest('.group-member')) {
        ChatFunctions.addPeopleToChat(event.target.closest('.group-member'))
    }
})

//~ groupChat.js

document.querySelector('.chat-parent').addEventListener('click', (event) => {
    if (event.target.closest('.chat-child')) {
        ChatFunctions.chatClicked(event.target.closest('.chat-child'))
    } else if (event.target.closest('.group-child')) {
        GroupChatFunctions.groupChatClicked(event.target.closest('.group-child'))
    }
})

// leave and delete group
document.querySelector('#leave-and-delete-group').addEventListener('click', () => {
    let groupId = document.querySelector('.group-child.active').dataset.id

    fetch('/group-chat-api/leave-and-delete-group', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groupId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                let groupChild = document.querySelector(`.group-child[data-id="${groupId}"]`)
                groupChild.remove()

                document.querySelector('#transparent-modal').click()

                let chat_head = document.getElementById('chats-head')
                let chat_mid = document.getElementById('all-chats')
                let chat_end = document.getElementById('chats-end')

                chat_head.classList.add('hidden')
                chat_mid.classList.add('hidden')
                chat_end.classList.add('hidden')

                let alert = document.querySelector('.alert')
                alert.children[1].textContent = 'Group left and deleted'
                alert.classList.remove('hidden')
                setTimeout(() => {
                    alert.classList.add('hidden')
                }, 5000)
            }
        })
        .catch((err) => {
            console.log('Error in leaving and deleting group: ', err)
        })
})

// show all group members
document.querySelector('#all-group-members-btn').addEventListener('click', () => {
    let dropdown = document.querySelector('#all-group-members-btn').parentElement
    if (dropdown.open) {
        return
    }

    let groupId = document.querySelector('.group-child.active').dataset.id

    fetch('/group-chat-api/get-group-members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            groupId,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                let groupMembers = data.groupMembers
                let groupMembersParent = document.querySelector('.all-group-members')
                groupMembersParent.textContent = ''
                let noOfMembers = groupMembers.length
                let noOfMembersDiv = groupMembersParent.previousElementSibling.querySelector('span')
                noOfMembersDiv.textContent = noOfMembers
                groupMembers.forEach((member) => {
                    let groupMember = GroupChatFunctions.groupMemberComponent(member)
                    groupMembersParent.appendChild(groupMember)
                })
            } else {
                let alert = document.querySelector('.alert')
                let alertText = alert.querySelector('span')
                alertText.textContent = 'Error in getting group members. Try refreshing the page.'
                alert.classList.remove('hidden')
                setTimeout(() => {
                    alert.classList.add('hidden')
                    alertText.textContent = ''
                }, 5000)
            }
        })
        .catch((err) => {
            console.log('Error in getting group members: ', err)
        })
})

// handle copy group link
document.querySelector('#copy-group-link-btn').addEventListener('click', () => {
    let copyLinkBtn = document.querySelector('#copy-group-link-btn')
    copyLinkBtn.dataset.tip = 'Copied'
    let currentGroupId = document.querySelector('.group-child.active').dataset.id
    navigator.clipboard.writeText(`${process.env.DOMAIN}/group-chat-api/join-group-via-link?id=${encodeURIComponent(currentGroupId)}`)

    setTimeout(() => {
        copyLinkBtn.dataset.tip = 'Copy Group Link'
    }, 2000)
})

//~ Add chat popup event listeners
const initializeAddChatPopupEventListeners = () => {
    // change tabs in add user popup
    document.querySelector('#new-chat-tab').addEventListener('click', () => {
        let newChatTab = document.querySelector('#new-chat-tab')
        let newGroupTab = document.querySelector('#new-group-tab')
        let newChatTabContent = document.querySelector('.new-chat-tab-content')
        let newGroupTabContent = document.querySelector('.new-group-tab-content-parent')

        newChatTab.classList.contains('tab-active') ? null : newChatTab.classList.add('tab-active')
        newGroupTab.classList.contains('tab-active') ? newGroupTab.classList.remove('tab-active') : null

        newChatTabContent.classList.contains('hidden') ? newChatTabContent.classList.remove('hidden') : null
        newGroupTabContent.classList.contains('hidden') ? null : newGroupTabContent.classList.add('hidden')
    })

    document.querySelector('#new-group-tab').addEventListener('click', () => {
        let newChatTab = document.querySelector('#new-chat-tab')
        let newGroupTab = document.querySelector('#new-group-tab')
        let newChatTabContent = document.querySelector('.new-chat-tab-content')
        let newGroupTabContent = document.querySelector('.new-group-tab-content-parent')

        newChatTab.classList.contains('tab-active') ? newChatTab.classList.remove('tab-active') : null
        newGroupTab.classList.contains('tab-active') ? null : newGroupTab.classList.add('tab-active')

        newChatTabContent.classList.contains('hidden') ? null : newChatTabContent.classList.add('hidden')
        newGroupTabContent.classList.contains('hidden') ? newGroupTabContent.classList.remove('hidden') : null
    })

    // Search people for chat
    document.getElementById('new-chat-search').addEventListener('keyup', async (event) => {
        event.preventDefault()
        try {
            const queryText = event.target.value.toLowerCase()
            const popupPeople = document.querySelectorAll('.new-chat-people')
            if (queryText === '') {
                popupPeople.forEach((person) => {
                    person.classList.contains('hidden') ? person.classList.remove('hidden') : null
                })
            } else {
                const data = await GroupChatFunctions.searchPeople(queryText)
                if (data.people.length === 0) {
                    popupPeople.forEach((person) => {
                        person.classList.contains('hidden') ? null : person.classList.add('hidden')
                    })
                } else {
                    const foundPeopleUsernames = data.people.map((person) => person.username)
                    popupPeople.forEach((person) => {
                        const personUsername = person.querySelector('.new-chat-people-username').innerText.trim()
                        if (foundPeopleUsernames.includes(personUsername)) {
                            person.classList.remove('hidden')
                        } else {
                            person.classList.add('hidden')
                        }
                    })
                }
            }
        } catch (error) {
            console.log('Error in searching people: ', error)
        }
    })

    // add the selected people to chat
    document.querySelector('.all-new-chat-people').addEventListener('click', (event) => {
        if (event.target.closest('.new-chat-people')) {
            ChatFunctions.addPeopleToChat(event.target.closest('.new-chat-people'))
        }
    })

    // scroll selected people horizontally
    document.querySelector('.new-group-selected-people').addEventListener(
        'wheel',
        (event) => {
            let selectedPeople = document.querySelector('.new-group-selected-people')
            selectedPeople.scrollLeft += event.deltaY
        },
        { passive: true }
    )

    // Done button for creating group
    document.querySelector('#new-group-done-btn').addEventListener('click', () => {
        document.querySelector('.create-group-tab-content').classList.remove('hidden')
        document.querySelector('.new-group-tab-content').classList.add('hidden')
    })

    // Search people for group
    document.getElementById('new-group-search').addEventListener('keyup', async (event) => {
        event.preventDefault()
        try {
            const queryText = event.target.value.toLowerCase()
            const popupPeople = document.querySelectorAll('.new-group-people')
            if (queryText === '') {
                popupPeople.forEach((person) => {
                    person.classList.contains('hidden') ? person.classList.remove('hidden') : null
                })
            } else {
                const data = await GroupChatFunctions.searchPeople(queryText)
                if (data.people.length === 0) {
                    popupPeople.forEach((person) => {
                        person.classList.contains('hidden') ? null : person.classList.add('hidden')
                    })
                } else {
                    const foundPeopleUsernames = data.people.map((person) => person.username)
                    popupPeople.forEach((person) => {
                        const personUsername = person.querySelector('.new-group-people-username').innerText.trim()
                        if (foundPeopleUsernames.includes(personUsername)) {
                            person.classList.remove('hidden')
                        } else {
                            person.classList.add('hidden')
                        }
                    })
                }
            }
        } catch (error) {
            console.log('Error in searching people: ', error)
        }
    })

    // show selected people for group chat
    document.querySelector('.all-new-group-people').addEventListener('click', (event) => {
        if (event.target.classList.contains('all-new-group-people')) {
            return
        }

        let checkBox = null
        let selectedPeopleParent = document.querySelector('.new-group-selected-people-parent')
        let selectedPeople = document.querySelector('.new-group-selected-people')
        let selectedPerson = event.target.closest('.new-group-people')
        // console.log(event.target)

        if (event.target.closest('.new-group-people')) {
            // Toggle the checkbox
            checkBox = event.target.closest('.new-group-people').querySelector('.new-group-people-checkbox input')
            if (checkBox) {
                if (checkBox !== event.target) {
                    checkBox.checked = !checkBox.checked
                }
            }
        }

        if (checkBox && checkBox.checked) {
            selectedPeopleParent.classList.contains('hidden') ? selectedPeopleParent.classList.remove('hidden') : null
            document.querySelector('.all-new-group-people').classList.replace('h-64', 'h-46')
            // Create selected person
            let selectedPersonDiv = document.createElement('div')
            selectedPersonDiv.classList.add('avatar')
            selectedPersonDiv.dataset.id = selectedPerson.dataset.id
            let selectedPersonInnerDiv = document.createElement('div')
            selectedPersonInnerDiv.classList.add('w-14', 'h-14', 'rounded-full')
            let selectedPersonImg = document.createElement('img')
            selectedPersonImg.src = selectedPerson.querySelector('img').src
            selectedPersonImg.alt = selectedPerson.querySelector('img').alt

            selectedPersonInnerDiv.appendChild(selectedPersonImg)
            selectedPersonDiv.appendChild(selectedPersonInnerDiv)
            selectedPeople.appendChild(selectedPersonDiv)
        } else {
            let selectedAllPeople = selectedPeople.children
            for (let person of selectedAllPeople) {
                // console.log('person', person.querySelector('img').alt)
                // console.log('selectedPerson', selectedPerson.querySelector('img').alt)
                if (person.querySelector('img').alt === selectedPerson.querySelector('img').alt) {
                    person.remove()
                }
            }

            if (selectedPeople.children.length === 0) {
                selectedPeopleParent.classList.contains('hidden') ? null : selectedPeopleParent.classList.add('hidden')
                document.querySelector('.all-new-group-people').classList.replace('h-46', 'h-64')
            }
        }
    })

    // Change group avatar button
    document.querySelector('#change-group-avatar-btn').addEventListener('click', () => {
        let groupAvatar = document.querySelector('#group-avatar')

        fetch('/api/get-group-avatar')
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                groupAvatar.src = data.groupAvatar
            })
            .catch((err) => {
                console.log('Error in getting group avatar: ', err)
            })
    })

    // Back button for creating group
    document.querySelector('#group-back-btn').addEventListener('click', () => {
        document.querySelector('.create-group-tab-content').classList.add('hidden')
        document.querySelector('.new-group-tab-content').classList.remove('hidden')
    })

    // Create group button
    document.querySelector('#group-create-btn').addEventListener('click', async () => {
        // collect the data
        let groupMembersIds = Array.from(document.querySelector('.new-group-selected-people').children).map((member) => member.dataset.id)
        let groupName = DOMPurify.sanitize(document.querySelector('#group-name').value)
        let groupDescription = DOMPurify.sanitize(document.querySelector('#group-description').value)
        let groupAvatar = document.querySelector('#group-avatar').src

        if (groupName === '' || groupDescription === '') {
            ChatFunctions.showNotification('Group name and description are required')
            return
        }

        await fetch('/group-chat-api/create-group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupMembersIds,
                groupName,
                groupDescription,
                groupAvatar,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                if (data.success) {
                    ChatFunctions.showNotification('Group created successfully')

                    // clean the form
                    document.querySelector('#add-chat-popup').innerHTML = addChatPopupInitialState

                    // close the popup
                    document.querySelector('#transparent-modal').click()

                    GroupChatFunctions.createLeftsideGroup(data.groupInfo)
                } else {
                    ChatFunctions.showNotification('Error in creating group. Please try again!')
                }
            })
            .catch((err) => {
                console.log('Error in creating group: ', err)
                ChatFunctions.showNotification('Error in creating group. Please refresh the page and try again!')
            })
    })
}

initializeAddChatPopupEventListeners()
