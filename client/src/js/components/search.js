function addActive(ele) {
	ele.classList.add("active");
}

// sidebar seemore implementation
let seeMore = document.querySelector("#see-more");
let seeLess = document.querySelector("#see-less");
seeMore.addEventListener("click", () => {
	let hiddenPart = document.querySelector("#hidden-top-sidebar");
	hiddenPart.classList.remove("hidden");
	let seeLess = document.querySelector("#see-less");
	seeMore.classList.add("hidden");
	seeLess.classList.remove("hidden");
});
seeLess.addEventListener("click", () => {
	let hiddenPart = document.querySelector("#hidden-top-sidebar");
	hiddenPart.classList.add("hidden");
	let seeMore = document.querySelector("#see-more");
	seeMore.classList.remove("hidden");
	seeLess.classList.add("hidden");
});

function formatNumber(number) {
	if (number >= 1000 && number < 1000000) {
		return (number / 1000).toFixed(1) + "k";
	} else if (number >= 1000000 && number < 1000000000) {
		return (number / 1000000).toFixed(1) + "M";
	} else if (number >= 1000000000 && number < 1000000000000) {
		return (number / 1000000000).toFixed(1) + "B";
	} else if (number >= 1000000000000) {
		return (number / 1000000000000).toFixed(1) + "T";
	} else {
		return number.toString();
	}
}

const searchPeople = (event) => {
	let queryText = event.target.value.toLowerCase();
	let searchRes = document.querySelector("#search-results");

	if (queryText === "") {
		searchRes.innerHTML = "";
		const emptyDiv = document.createElement("div");
		emptyDiv.classList.add("empty-result", "text-3xl", "font-bold");

		emptyDiv.innerHTML = `
        <h1>Search for people</h1>
        `;

		searchRes.appendChild(emptyDiv);
		return;
	} else {
		fetch("/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ queryText }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("people: ", data.people);

				searchRes.innerHTML = "";
				if (data.people.length === 0) {
					const emptyDiv = document.createElement("div");
					emptyDiv.classList.add(
						"empty-result",
						"text-3xl",
						"font-bold"
					);

					emptyDiv.innerHTML = `
                    <h1>No Result Found</h1>
                    `;

					searchRes.appendChild(emptyDiv);
				} else {
					data.people.forEach((person) => {
						let img =
							"/assets/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png";
						if (person.profilePic) {
							img = person.profilePic;
						}
						let personDiv = document.createElement("div");
						personDiv.classList.add("search-result");
						personDiv.innerHTML = `
                    <div class="search-result-img">
                        <img src=${img} alt="User" />
                    </div>
                    <div class="search-result-info ">
                        <div class="search-result-name">
                            <h4 class="search-result-name">${person.fullName}</h4>
                            <h6 class="search-result-uname">${person.username}</h6>
                        </div>
                        <div class="search-result-followers">
                            <h6>${formatNumber(person.followers)} Followers</h6>
                            <h6>${formatNumber(person.followings)} Followings</h6>
                        </div>
                    </div>
                    `;
						searchRes.appendChild(personDiv);
					});
				}
			});
	}
};

document
	.querySelector("#search")
	.addEventListener("keyup", (event) => searchPeople(event));

document.querySelector("#search-btn").addEventListener("click", () =>
	searchPeople({
		target: { value: document.querySelector("#search").value },
	})
);
