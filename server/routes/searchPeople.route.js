import { Router } from "express";
const router = Router();
import searchPeopleController from "../controllers/searchPeople.controller.js";

router.post("/", searchPeopleController);

export default router;
