import jwt from 'jsonwebtoken'

const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
        gender: user.gender,
        avatar: user.avatar,
        role: user.role,
    }
    const options = {
        expiresIn: '1h',
    }
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options)
}

const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
        gender: user.gender,
        avatar: user.avatar,
        role: user.role,
    }
    const options = {
        expiresIn: '1h',
    }
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options)
}

const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        return { success: true, data: decoded }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.sendStatus(401)
    }

    const result = verifyRefreshToken(token)

    if (!result.success) {
        return res.status(403).json({ error: result.error })
    }

    req.user = result.data
    next()
}

export { generateAccessToken, generateRefreshToken, verifyRefreshToken, authenticateToken }
