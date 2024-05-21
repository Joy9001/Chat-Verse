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
