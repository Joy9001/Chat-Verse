import { createAvatar } from '@dicebear/core'
import * as avatars from '@dicebear/collection'
import { hashPassword } from './password.helper.js'

export const generateAvatar = (name) => {
    const avatar = createAvatar(avatars.adventurer, {
        seed: name,
    })

    const dataUri = avatar.toDataUriSync()
    return dataUri
}
