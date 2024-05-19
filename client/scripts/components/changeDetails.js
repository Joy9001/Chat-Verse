document
	.querySelector("#change-profilePic-btn")
	.addEventListener("click", () => {
		const modalProfilePic = document.querySelector(
			"#change-details-profilePic"
		);

		const gender = document.querySelector(
			"#change-details-gender option:checked"
		).value;
		console.log(gender);

		fetch("/api/get-avatar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ gender }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.avatar);
				// console.log(modalProfilePic.src);
				modalProfilePic.src = data.avatar;
			})
			.catch((error) => console.log(error.message));
	});

document
	.querySelector("#chat-change-details-done-btn")
	.addEventListener("click", () => {
		//~ TODO: Implement the logic when no changes are made (retrieve the current values from cookies and compare with the new values)

		const id = atob(document.body.dataset.currentUserId);
		const name = document.querySelector("#change-details-name").value;
		const username = document.querySelector(
			"#change-details-username"
		).value;
		const gender = document.querySelector(
			"#change-details-gender option:checked"
		).value;
		const avatar = document.querySelector("#change-details-profilePic").src;

		fetch("/api/change-details", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, name, username, gender, avatar }),
		})
			.then((res) => res.json())
			.then((data) => {
				document
					.querySelector("#change-details-response")
					.classList.remove("hidden");
				document.querySelector(
					"#change-details-response span"
				).textContent = data.message;
				if (data.success) {
					document.querySelector("#from-user-modal-img").src = avatar;
				}
				setTimeout(() => {
					document.querySelector(
						"#change-details-response span"
					).textContent = "";
					document
						.querySelector("#change-details-response")
						.classList.add("hidden");
				}, 5000);
			});
	});
