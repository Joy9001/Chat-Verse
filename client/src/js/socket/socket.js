const handleHtmlGet = (message) => {
	let date = utcToLocal(message.createdAt);
	let msgDate = date.slice(6);
	let msgTime = date.slice(0, 5);

	let dates = document.querySelectorAll(".date");
	let msgContainerDiv = document.querySelector(".message-container");

	if (dates.length === 0 || dates[dates.length - 1].innerText !== msgDate) {
		const dayDiv = document.createElement("div");
		dayDiv.classList.add("day");
		const dateDiv = document.createElement("div");
		dateDiv.classList.add("date");
		const dateh1 = document.createElement("h1");
		dateh1.innerText = msgDate;

		dateDiv.appendChild(dateh1);
		dayDiv.appendChild(dateDiv);
		msgContainerDiv.appendChild(dayDiv);
	}

	let msg_div = document.createElement("div");
	msg_div.classList.add("to-user-msg");
	msg_div.dataset.id = message._id;
	console.log("message id", message._id);
	msg_div.innerHTML = `
        <div class="msg-container">
            <p>${message.message}</p>
            <span>${msgTime}</span>
        </div>
        <div class="pl-2 delete-msg-btn hidden" onclick="deleteMessege(this)">
        <button class="btn btn-circle btn-outline btn-secondary h-6 w-6 min-h-4 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 group-hover:stroke-[#9376E0]" fill="none" viewBox="0 0 24 24" stroke="#dee2ff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        </div>
    `;
	msgContainerDiv.appendChild(msg_div);

	let chatSection = document.querySelector(".chat-section");
	chatSection.scrollTop = chatSection.scrollHeight;
};

const handleHtmlOnlineUsers = (users) => {
	const leftPeople = document.querySelectorAll(".people-child");
	leftPeople.forEach((person) => {
		let data = JSON.parse(atob(person.dataset.element));
		let status = person.children[0].children[0];
		let toUserProfile = document.querySelector(".to-user-profile");
		let toUserStatus = toUserProfile.children[0].children[0];

		if (users.includes(data._id)) {
			if (status.classList.contains("hidden")) {
				status.classList.remove("hidden");
				toUserStatus.classList.remove("hidden");
			}
		} else {
			if (!status.classList.contains("hidden")) {
				status.classList.add("hidden");
				toUserStatus.classList.add("hidden");
			}
		}
	});
};

const createLeftsidePeopleR = (data) => {
	let parentDiv = document.createElement("div");
	parentDiv.classList.add("people-child");
	parentDiv.dataset.element = btoa(JSON.stringify(data));
	parentDiv.onclick = () => chatClicked(parentDiv);

	let imgDiv = document.createElement("div");
	imgDiv.classList.add("chats_img");
	imgDiv.classList.add("indicator");

	let statusDiv = `<span class="indicator-item badge badge-success h-2 p-[0.4rem] translate-x-[5%] translate-y-[10%] status"></span>`;

	let img = document.createElement("img");
	img.src = data.profilePic
		? data.profilePic
		: `https://avatar.iran.liara.run/username?username=${data.name.replace(" ", "+")}`;
	img.alt = data.name;

	imgDiv.innerHTML = statusDiv;
	imgDiv.appendChild(img);
	parentDiv.appendChild(imgDiv);

	let nameDiv = document.createElement("div");
	nameDiv.classList.add("people_name_parent");

	let name = document.createElement("h4");
	name.classList.add("people_name");
	name.innerText = data.name;

	nameDiv.appendChild(name);
	parentDiv.appendChild(nameDiv);

	let badgeDiv = `
	<div class="unread-badge absolute right-8 hidden">
        <div class="badge badge-accent">0</div>
    </div>`;

	parentDiv.innerHTML += badgeDiv;

	let all_people = document.getElementById("people-parent");
	all_people.appendChild(parentDiv);
	return parentDiv;
};

const socket = io("http://localhost:3000", {
	query: {
		userId: atob(document.body.dataset.currentUserId),
	},
});

let onlineUsers = [];
socket.on("getOnlineUsers", (users) => {
	console.log("Online users", users);
	onlineUsers = btoa(users);
	handleHtmlOnlineUsers(users);
});

socket.on("newMessage", (message, senderId) => {
	console.log("New message", message);
	let leftPeople = document.querySelectorAll(".people-child");
	let sender = "";
	leftPeople.forEach((person) => {
		let data = JSON.parse(atob(person.dataset.element));
		if (data._id === senderId) {
			sender = person;
		}
	});

	if (sender === "") {
		let popupPeople = document.querySelectorAll(".popup-people");
		popupPeople.forEach((person) => {
			let data = JSON.parse(atob(person.dataset.element));
			if (data._id === senderId) {
				sender = person;
			}
		});

		if (sender === "") {
			console.log("Sender not found", senderId);
			return;
		} else {
			console.log("creating");
			sender = createLeftsidePeopleR(
				JSON.parse(atob(sender.dataset.element))
			);
		}
	}

	console.log("sender", sender.children[2]);
	if (sender.classList.contains("active")) {
		handleHtmlGet(message);
	} else {
		let unreadMsg = sender.children[2];
		// console.log("sender", sender);
		console.log("unreadMsg", unreadMsg);
		let unreadMsgCount = parseInt(unreadMsg.innerText) + 1;
		unreadMsg.children[0].innerText = unreadMsgCount;
		unreadMsg.classList.remove("hidden");

		fetch("/unread-message", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				senderId: senderId,
				receiverId: atob(document.body.dataset.currentUserId),
				unreadMsgCount: unreadMsgCount,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("unread", data);
			});
	}
});

socket.on("deleteMessage", (dltMsgId) => {
	// console.log("Deleted message", dltMsgId);
	let allToUserMsg = document.querySelectorAll(".to-user-msg");
	allToUserMsg.forEach((msg) => {
		let msgId = msg.dataset.id;
		console.log("msgId", msgId, "dltMsgId", dltMsgId);
		if (msgId === dltMsgId) {
			msg.remove();
		}
	});

	let allFromuserMsg = document.querySelectorAll(".from-user-msg");
	allFromuserMsg.forEach((msg) => {
		let msgId = msg.dataset.id;
		console.log("msgId", msgId, "dltMsgId", dltMsgId);
		if (msgId === dltMsgId) {
			msg.remove();
		}
	});

	let days = document.querySelectorAll(".day");
	days.forEach((day) => {
		if (day.nextElementSibling === null) {
			day.remove();
		}
	});
});

socket.on("deleteConversation", (senderId) => {
	let receiver = document.querySelector(".people-child.active");
	let chat_head = document.getElementById("chats-head");
	let chat_mid = document.getElementById("all-chats");
	let chat_end = document.getElementById("chats-end");
	receiver.classList.remove("active");
	receiver.classList.add("hidden");
	chat_head.classList.add("hidden");
	chat_mid.classList.add("hidden");
	chat_end.classList.add("hidden");
});

socket.on("blockUser", (senderId) => {
	console.log("Blocked user", senderId);
	let chat_end = document.getElementById("chats-end");
	chat_end.classList.add("hidden");

	let blockDiv = document.querySelector("#chats-end-block");
	blockDiv.classList.remove("hidden");

	let blockBtn = document.querySelector("#block-to-user");
	blockBtn.classList.add("hidden");
});

socket.on("unblockUser", (senderId) => {
	console.log("Unblocked user", senderId);
	let blockDiv = document.querySelector("#chats-end-block");
	blockDiv.classList.add("hidden");

	let blockBtn = document.querySelector("#block-to-user");
	blockBtn.classList.remove("hidden");

	let chat_end = document.getElementById("chats-end");
	chat_end.classList.remove("hidden");
});

socket.on("connection", () => {
	console.log("Connected to server", socket.id);
});

socket.on("disconnect", () => {
	console.log("Disconnected from server");
	socket.off("newMessage");
});
