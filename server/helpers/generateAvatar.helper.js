import { createAvatar } from '@dicebear/core'
import * as avatars from '@dicebear/collection'

export const generateAvatar = (name) => {
    const avatar = createAvatar(avatars.micah, {
        seed: name,
    })

    const dataUri = avatar.toDataUriSync()
    return dataUri
}
