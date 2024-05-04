const express = require("express");
const router = express.Router();
const { messageController } = require("../controllers/message.controller.js");

// const people = ['Sekiro', 'Emma', 'Isshin', 'Genichiro', 'Lord Kuro', 'Owl'];

router.get("/", (req, res, next) => {
	res.send("Hello World");
});

router.get("/messages/:id", messageController);

module.exports = router;
