import { Router } from "express";
const router = Router();
import { messageController } from "../controllers/message.controller.js";

router.get("/login", (req, res) => {
	res.render("login");
});

router.get("/messages/:id", messageController);

export default router;
