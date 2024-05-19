import { Router } from "express";
import { generateAvatar } from "../helpers/generateAvatar.helper.js";
const router = Router();

router.post("/get-avatar", (req, res) => {
	const { gender } = req.body;

	fetch(`https://randomuser.me/api/?gender=${gender.toLowerCase()}`)
		.then((res) => res.json())
		.then((data) => {
			const name = data.results[0].name.first;
			console.log("name", name);
			const avatar = generateAvatar(name);
			res.json({ avatar });
		});
});

export default router;
