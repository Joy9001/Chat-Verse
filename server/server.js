import express from 'express'
import { app, server } from './helpers/socket.helper.js'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import indexRouter from './routes/index.route.js'

// database connection
import connectMongo from './db/connectMongo.db.js'
const PORT = process.env.PORT || 3000

// load environment variables
dotenv.config()

// logger
app.use(morgan('dev'))

// view engine setup
app.set('views', path.resolve('client/views'))
app.set('view engine', 'ejs')

// cookie parser
app.use(cookieParser())

// session
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
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
app.use(express.static(path.resolve('client/public')))
app.use(express.static(path.resolve('client/styles')))
app.use(express.static(path.resolve('client/scripts')))
app.use(express.static(path.resolve('client/dist')))
// app.use(express.static("./dist"));

// routes

app.get('/', (req, res) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {
            console.log('Error in /: ', err.message)
            return res.redirect('/auth/login')
        }

        if (user) {
            return res.redirect('/chat')
        }

        console.log('Info in /: ', info.message)
        res.redirect('/auth/login')
    })(req, res)
})

app.use('/', indexRouter)

server.listen(PORT, async () => {
    await connectMongo().then(async () => {
        console.log('MongoDB connected')
        console.log(`Server running on http://localhost:${PORT}`)
        // await open(`http://localhost:${PORT}`);
    })
    // .then(async () => {
    //     try {
    //         await createAdminData().then(() => {
    //             console.log('Admin data created')
    //         })
    //     } catch (error) {
    //         console.log('Error creating admin data: ', error.message)
    //     }
    // })
})
