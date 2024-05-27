import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { instrument } from '@socket.io/admin-ui'
import passport from 'passport'
import '../strategies/passport-jwt.strategy.js'
import cookieParser from 'cookie-parser'

const app = express()

// middlewares for parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

// admin ui for socket.io
instrument(io, {
    auth: false,
    mode: 'development',
})

// Share user context with socket.io server
// io.engine.use((req, res, next) => {
//     console.log('req in engine', Object.keys(req))
//     // console.log('req in engine', typeof req.rawHeaders)
//     console.log('\nreq in engine\n', req, '\n')
//     // console.log('req in engine', req.rawHeaders)
//     const isHandshake = req._query.sid === undefined
//     if (isHandshake) {
//         passport.authenticate('jwt')(req, res, next)
//     } else {
//         next()
//     }
// })

const getReceiverSocketId = (receiverId) => {
    return userSocket[receiverId]
}

const userSocket = {}

io.on('connection', (socket) => {
    console.log('user in socket', socket.request.user)
    const userId = socket.handshake.query.userId
    console.log('socket handshake', socket.handshake)
    if (userId) {
        userSocket[userId] = socket.id
    }
    console.log('A user connected', socket.id)

    io.emit('getOnlineUsers', Object.keys(userSocket))

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id)
        delete userSocket[userId]
        io.emit('getOnlineUsers', Object.keys(userSocket))
    })
})

export { app, server, io, getReceiverSocketId }
