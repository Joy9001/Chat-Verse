import { createAvatar } from '@dicebear/core'
import * as avatars from '@dicebear/collection'

const generateAvatar = () => {
	const avatar = createAvatar(avatars.adventurer, {
		seed: Math.floor(Math.random() * 10000),
	})

	const dataUri = avatar.toDataUriSync()
	return dataUri
}

const generateGroupAvatar = () => {
	const groupAvatar = createAvatar(avatars.thumbs, {
		seed: Math.floor(Math.random() * 10000),
	})

	const dataUri = groupAvatar.toDataUriSync()
	return dataUri
}

export { generateAvatar, generateGroupAvatar }
