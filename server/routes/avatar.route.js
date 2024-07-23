import { Router } from 'express'
import { generateAvatar, generateGroupAvatar } from '../helpers/generateAvatar.helper.js'
const router = Router()

router.get('/get-avatar', (req, res) => {
    const avatar = generateAvatar()
    res.json({ avatar })
})

router.get('/get-group-avatar', (req, res) => {
    const groupAvatar = generateGroupAvatar()
    res.json({ groupAvatar })
})

export default router
