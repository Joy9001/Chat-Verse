import { createAvatar } from "@dicebear/core";
import * as avatars from "@dicebear/collection";

const generateAvatar = (name) => {
	const avatar = createAvatar(avatars.adventurer, {
		seed: name,
	});

	return avatar.toDataUriSync();
};

document
	.querySelector("#change-profilePic-btn")
	.addEventListener("click", () => {
		const modalProfilePIc = document.querySelector(
			"#change-details-profilePic"
		);

		let newPic = generateAvatar(
			document.querySelector("#change-details-name").value
		);

		modalProfilePIc.src = newPic;
	});
