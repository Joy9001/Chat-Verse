import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import connectMongo from "./db/connectMongo.db.js";
const PORT = process.env.PORT || 3000;
// const { instrument } = require("@socket.io/admin-ui");

import { app, server } from "./helpers/socket.helper.js";

app.set("views", path.join("../client/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join("../client/public")));
app.use(express.static(path.join("../client/src")));
app.use(express.static(path.join("../server/uploads/")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import indexRouter from "./routes/index.route.js";
import addPeopleToChatRouter from "./routes/addPeopleToChat.route.js";
import getConversationRouter from "./routes/getConversation.route.js";
import messageRouter from "./routes/messages.route.js";
import searchPeopleRouter from "./routes/searchPeople.route.js";

// instrument(io, {
// 	auth: false,
// 	mode: "development",
// });

app.use(indexRouter);
app.use(addPeopleToChatRouter);
app.use(getConversationRouter);
app.use(messageRouter);
app.use(searchPeopleRouter);

server.listen(PORT, async () => {
	await connectMongo().then(() => {
		console.log("MongoDB connected");
		console.log(`Server running on http://localhost:${PORT}`);
	});
});
