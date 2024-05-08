import { createAvatar } from "@dicebear/core";
import * as avatars from "@dicebear/collection";

export const generateAvatar = (name) => {
	const avatar = createAvatar(avatars.adventurer, {
		seed: name,
	});

	return avatar.toDataUriSync();
};
