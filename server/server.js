import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import passport from 'passport'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import path from 'path'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import indexRouter from './routes/index.route.js'
import connectMongo from './db/connectMongo.db.js'
import './strategies/passport-jwt.strategy.js'
import { onlyForHandshake } from './helpers/socket.helper.js'
import User from './models/users.model.js'
import { Conversation } from './models/conversation.model.js'
import { getGroupConversationMap, getUserMap } from './helpers/maps.helper.js'

const PORT = process.env.PORT || 3000
let USER_MAP = await getUserMap()
let GROUP_CONV_MAP = await getGroupConversationMap()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.DOMAIN, 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

// logger
app.use(morgan('dev'))

// helmet
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
)

// cors
app.use(cors())

// Troubleshooting Proxy Issues
const numberOfProxies = 3
app.set('trust proxy', numberOfProxies)

// middlewares for parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// view engine setup
app.set('views', path.resolve('client/views/dist'))
app.set('view engine', 'ejs')

// session middleware
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URI,
        collectionName: 'sessions',
    }),
})
app.use(sessionMiddleware)

// passport
app.use(passport.initialize())
app.use(passport.session())

// static files
app.use(
    express.static(path.resolve('client/public'), {
        setHeaders: (res, path) => {
            res.setHeader('Cache-Control', 'public, max-age=31536000') // Cache static files for 1 year
        },
    })
)
app.use(
    express.static(path.resolve('client/dist'), {
        setHeaders: (res, path) => {
            res.setHeader('Cache-Control', 'public, max-age=604800, immutable') // Cache static files for 1 week
        },
    })
)

// admin ui for socket.io
instrument(io, {
    auth: {
        type: 'basic',
        username: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_HASHED_PASSWORD,
    },
    mode: 'development',
})

io.engine.use(onlyForHandshake(sessionMiddleware))
io.engine.use(onlyForHandshake(passport.session()))
io.engine.use(
    onlyForHandshake((req, res, next) => {
        // console.log('req user is handshake: ', req.user)
        if (req.user) {
            next()
        } else {
            res.writeHead(401)
            res.end()
        }
    })
)
io.engine.on('connection_error', (err) => {
    console.error('Error connecting to socket.io: ', err.message)
})

// All users connected to the server
let userSockets = {}

const getOnlineUsers = async (userSockets) => {
    let findUserPromises = []
    for (let userId in userSockets) {
        findUserPromises.push(
            User.findById(userId, {
                _id: 1,
                username: 1,
            })
        )
    }

    let onlineUsers = []
    await Promise.all(findUserPromises)
        .then((users) => {
            users.forEach((user) => {
                if (user) {
                    onlineUsers.push(user.username)
                }
            })
        })
        .catch((err) => {
            console.error('Error getting online users: ', err.message)
        })

    return onlineUsers
}

io.on('connection', async (socket) => {
    // console.log('user in socket', socket.request.user)
    const userId = socket.request.user._id
    if (userId) {
        userSockets[userId] = socket.id

        if (!USER_MAP[userId]) {
            USER_MAP = await getUserMap()
        }
    }
    console.log('A user connected', socket.id)

    let onlineUsers = await getOnlineUsers(userSockets)
    io.emit('getOnlineUsers', onlineUsers)

    // join all the rooms
    let groupsUserJoined = await Conversation.find(
        {
            participants: {
                $all: [userId],
            },
            isGroup: true,
        },
        {
            _id: 1,
        }
    ).lean()

    groupsUserJoined.forEach((group) => {
        socket.join(group._id)
    })

    // join the room
    socket.on('join-room', (roomId) => {
        socket.join(roomId)
    })

    socket.on('disconnect', async () => {
        console.log('A user disconnected', socket.id)
        delete userSockets[userId]

        let onlineUsers = await getOnlineUsers(userSockets)
        io.emit('getOnlineUsers', onlineUsers)
    })
})

//~ routes

// serve admin ui
app.use(
    '/admin',
    (req, res, next) => {
        passport.authenticate('jwt', async (err, user, info) => {
            if (err) {
                console.error('Error in /admin: ', err.message)
                return res.status(401).render('404', { error: 'Unauthorized! Only admin can access this page!', code: 401 })
            }
            if (user) {
                const userId = user._id
                const findUser = await User.findById(userId)

                if (!findUser) {
                    console.log('User not found')
                    return res.status(400).json({ error: 'User not found' })
                }

                if (findUser.role !== 'admin') {
                    console.log('User is not an admin')
                    return res.status(401).render('404', { error: 'Unauthorized! Only admin can access this page!', code: 401 })
                }

                const userSession = {
                    _id: user._id,
                }
                req.user = userSession
                return next()
            }
            console.log('Info in /admin: ', info.message)
            return res.status(401).render('404', { error: 'Unauthorized! Only admin can access this page!', code: 401 })
        })(req, res, next)
    },
    express.static(path.resolve('./client/admin-ui/dist'))
)

app.get('/', (req, res) => {
    return res.redirect('/chat')
})

app.use('/', indexRouter)

app.get('*', function (req, res) {
    res.status(404).render('404', { error: 'Page not found', code: 404 })
})

server.listen(PORT, async () => {
    await connectMongo()
        .then(async () => {
            console.log('MongoDB connected')
            console.log(`Server running on http://localhost:${PORT}`)
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB: ', err.message)
            // retry connecting to MongoDB
            setTimeout(async () => {
                await connectMongo()
                    .then(() => {
                        console.log('MongoDB connected')
                        console.log(`Server running on http://localhost:${PORT}`)
                    })
                    .catch((err) => {
                        console.error('Error connecting to MongoDB: ', err.message)
                    })
            }, 2000)
        })
})

export { io, userSockets, USER_MAP, GROUP_CONV_MAP }
