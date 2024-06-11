import { Router } from 'express'
import User from '../models/users.model.js'
import { csrfSync } from 'csrf-sync'
const router = Router()
import { getReceiverSocketId } from '../helpers/socket.helper.js'
import { io } from '../server.js'

// csrf
const { csrfSynchronisedProtection } = csrfSync()

router.post('/username-available', async (req, res) => {
    const { username } = req.body

    try {
        const findUser = await User.findOne({ username })

        if (findUser) {
            return res.json({ success: false, message: 'Username already taken' })
        }

        return res.json({ success: true, message: 'Username available' })
    } catch (error) {
        console.error(error.message)
        return res.json({ success: false, message: 'Error checking username availability' })
    }
})

router.post('/change-details', csrfSynchronisedProtection, async (req, res) => {
    const currentUserId = req.user._id
    const { name, username, gender, avatar } = req.body

    const findUser = await User.findById(currentUserId, {
        name: 1,
        username: 1,
        gender: 1,
        avatar: 1,
    })

    if (!findUser) {
        return res.json({ success: false, message: 'User not found' })
    }

    const findUsername = await User.findOne({ username })

    const oldUserDetails = {
        name: findUser.name,
        username: findUser.username,
        avatar: findUser.avatar,
    }

    if (findUsername && !findUsername._id.equals(currentUserId)) {
        return res.json({ success: false, message: 'Username already taken', user: findUser })
    }

    findUser.name = name
    findUser.username = username
    findUser.gender = gender
    findUser.avatar = avatar

    try {
        const savedUser = await findUser.save()

        const newUserDetails = {
            name: savedUser.name,
            username: savedUser.username,
            avatar: savedUser.avatar,
        }

        // Send the details to all the users who have added the current user to chat
        const allSenders = await User.find(
            {
                _id: {
                    $nin: [currentUserId],
                },
            },
            {
                name: 1,
                username: 1,
                avatar: 1,
            }
        )

        allSenders.forEach(async (sender) => {
            const senderSocketId = getReceiverSocketId(sender._id)

            if (senderSocketId) {
                io.to(senderSocketId).emit('receiver-changed-details', oldUserDetails, newUserDetails, (response) => {
                    console.log(response)
                    if (response.status === 'success') {
                        console.log('Changed details send successfully')
                    } else {
                        console.error('Error sending changed details')
                    }
                })
            }
        })
        return res.json({
            success: true,
            message: 'Details changed successfully',
            user: findUser,
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
