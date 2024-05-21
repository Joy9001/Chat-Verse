import express from 'express'
import { app, server } from './helpers/socket.helper.js'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

// database connection
import connectMongo from './db/connectMongo.db.js'
const PORT = process.env.PORT || 3000

// view engine setup
app.set('views', path.resolve('client/views'))
app.set('view engine', 'ejs')

// static files
app.use(express.static(path.resolve('client/public')))
app.use(express.static(path.resolve('client/styles')))
app.use(express.static(path.resolve('client/scripts')))
// app.use(express.static("./dist"));

// middlewares for parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
import indexRouter from './routes/index.route.js'
import addPeopleToChatRouter from './routes/addPeopleToChat.route.js'
import getConversationRouter from './routes/getConversation.route.js'
import messageRouter from './routes/chat.route.js'
import searchPeopleRouter from './routes/searchPeople.route.js'
import avatarRouter from './routes/avatar.route.js'
import changeDetailsRouter from './routes/changeDetails.route.js'
import { createAdminData } from './helpers/fakeData.js'

// instrument(io, {
// 	auth: false,
// 	mode: "development",
// });

app.get('/', (req, res) => {
    res.redirect('/login')
})

app.use('/', indexRouter)
app.use('/add-people-api/', addPeopleToChatRouter)
app.use('/get-conv-api/', getConversationRouter)
app.use('/message/', messageRouter)
app.use('/search/', searchPeopleRouter)
app.use('/api/', avatarRouter)
app.use('/api/', changeDetailsRouter)

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
