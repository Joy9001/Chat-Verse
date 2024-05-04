const express = require("express");
const router = express.Router();
const {
	sendMessageController,
	deleteMessageController,
	unreadMessageController,
	deleteConversationController,
	blockUserController,
	unblockUserController,
} = require("../controllers/message.controller");
// const

router.post("/send-message", sendMessageController);

router.post("/delete-message", deleteMessageController);

router.post("/unread-message", unreadMessageController);

router.post("/delete-conversation", deleteConversationController);

router.post("/block-user", blockUserController);

router.post("/unblock-user", unblockUserController);

module.exports = router;
