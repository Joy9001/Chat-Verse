import { Router } from 'express'
import { generateAvatar } from '../helpers/generateAvatar.helper.js'
const router = Router()
import fetch from 'node-fetch' // Node ver>=18 doesn't have fetch by deafult

router.post('/get-avatar', (req, res) => {
    const { gender } = req.body

    if (
        typeof gender !== 'string' ||
        !['male', 'female'].includes(gender.toLowerCase())
    ) {
        return res
            .status(400)
            .json({ error: 'Invalid gender. Must be "male" or "female".' })
    }

    fetch(`https://randomuser.me/api/?gender=${gender.toLowerCase()}`)
        .then((res) => res.json())
        .then((data) => {
            const name = data.results[0].name.first
            console.log('name', name)
            const avatar = generateAvatar(name)
            res.json({ avatar })
        })
        .catch((err) => {
            console.log('Error in get-avatar: ', err.message)
            res.status(500).json({ error: 'Internal server error' })
        })
})

export default router
