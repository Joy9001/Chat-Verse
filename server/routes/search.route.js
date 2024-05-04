const express = require("express");
const router = express.Router();
const { searchController } = require("../controllers/search.controller");

router.get("/search/:id", (req, res) => {
	res.render("search");
});

router.post("/search", searchController);

module.exports = router;
