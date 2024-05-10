import { Router } from "express";
const router = Router();
import { messageController } from "../controllers/message.controller.js";

// const people = ['Sekiro', 'Emma', 'Isshin', 'Genichiro', 'Lord Kuro', 'Owl'];

router.get("/:id", messageController);

export default router;
