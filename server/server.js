import express from "express";
import { app, server } from "./helpers/socket.helper.js";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// webpack
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import WebpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../client/webpack.dev.js";
const compiler = webpack(webpackConfig);

// console.log("webpackConfig: ", webpackConfig);
// console.log("compiler: ", compiler);
app.use(
	webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: "errors-only",
	})
);

app.use(WebpackHotMiddleware(compiler));

// database connection
import connectMongo from "./db/connectMongo.db.js";
const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join("../client/src/views"));
app.set("view engine", "ejs");

// static files
// app.use(express.static(path.join("../client/dist/public")));
// app.use(express.static(path.join("../client/src/styles/")));
// app.use(express.static(path.join("../client/src/scripts/")));
app.use(express.static("../client/dist/"));

// middlewares for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
import indexRouter from "./routes/index.route.js";
import addPeopleToChatRouter from "./routes/addPeopleToChat.route.js";
import getConversationRouter from "./routes/getConversation.route.js";
import messageRouter from "./routes/messages.route.js";
import searchPeopleRouter from "./routes/searchPeople.route.js";

import { createAdminData } from "./helpers/fakeData.js";

// instrument(io, {
// 	auth: false,
// 	mode: "development",
// });

app.get("/", (req, res) => {
	res.redirect("/login");
});

app.use("/", indexRouter);
app.use("/add-people-to-chat", addPeopleToChatRouter);
app.use("/get-conversation", getConversationRouter);
app.use("/message", messageRouter);
app.use("/search-people", searchPeopleRouter);

server.listen(PORT, async () => {
	await connectMongo().then(() => {
		console.log("MongoDB connected");
		console.log(`Server running on http://localhost:${PORT}`);
	});
	// .then(async () => {
	// 	try {
	// 		await createAdminData().then(() => {
	// 			console.log("Admin data created");
	// 		});
	// 	} catch (error) {
	// 		console.log("Error creating admin data: ", error.message);
	// 	}
	// });
});
