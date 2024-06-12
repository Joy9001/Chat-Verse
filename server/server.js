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

const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.SITE_URL, 'https://admin.socket.io'],
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
// app.set('views', path.resolve('client/views'))
app.set('views', path.resolve('client/dist/views'))
app.set('view engine', 'ejs')

// session middleware
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
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

// serve admin ui
app.use(
    '/admin',
    (req, res, next) => {
        passport.authenticate('jwt', async (err, user, info) => {
            if (err) {
                console.error('Error in /admin: ', err.message)
                return res.status(401).json({ error: 'Unauthorized! Only admin can access this page!' })
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
                    return res.status(401).json({ error: 'Unauthorized! Only admin can access this page!' })
                }

                const userSession = {
                    _id: user._id,
                }
                req.user = userSession
                return next()
            }
            console.log('Info in /admin: ', info.message)
            return res.status(401).json({ error: 'Unauthorized! Only admin can access this page!' })
        })(req, res, next)
    },
    express.static(path.resolve('./client/admin-ui/dist'))
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

// All users connected to the server
const userSockets = {}

io.on('connection', (socket) => {
    // console.log('user in socket', socket.request.user)
    const userId = socket.request.user._id
    if (userId) {
        userSockets[userId] = socket.id
    }
    console.log('A user connected', socket.id)
    io.emit('getOnlineUsers', Object.keys(userSockets))

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id)
        delete userSockets[userId]
        io.emit('getOnlineUsers', Object.keys(userSockets))
    })
})

// routes
app.get('/', (req, res) => {
    return res.redirect('/chat')
})

app.use('/', indexRouter)

server.listen(PORT, async () => {
    await connectMongo()
        .then(async () => {
            console.log('MongoDB connected')
            console.log(`Server running on http://localhost:${PORT}`)
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB: ', err.message)
        })
})

export { io, userSockets }
