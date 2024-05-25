import { Router } from 'express'
import User from '../models/users.model.js'
const router = Router()

router.post('/username-available', (req, res) => {
    const { username } = req.body

    User.findOne({ username }, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Error checking username availability',
            })
        }

        if (user) {
            return res.json({ success: false, message: 'Username already exists' })
        }

        return res.json({ success: true, message: 'Username is available' })
    })
})

router.post('/change-details', async (req, res) => {
    const { id, name, username, gender, avatar } = req.body

    const findUser = await User.findById(id)
    if (!findUser) {
        return res.json({ success: false, message: 'User not found' })
    }

    findUser.name = name
    findUser.username = username
    findUser.gender = gender
    findUser.avatar = avatar

    try {
        findUser.save()
        return res.json({
            success: true,
            message: 'Details changed successfully',
        })
    } catch (error) {
        console.error(error.message)
        return res.json({
            success: false,
            message: 'Error changing details! Please Contact Us!',
        })
    }
})

export default router
