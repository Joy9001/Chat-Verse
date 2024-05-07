import { Router } from "express";
const router = Router();
import { messageController } from "../controllers/message.controller.js";

// const people = ['Sekiro', 'Emma', 'Isshin', 'Genichiro', 'Lord Kuro', 'Owl'];

router.get("/", (req, res, next) => {
	res.send("Hello World");
});

router.get("/messages/:id", messageController);

export default router;
