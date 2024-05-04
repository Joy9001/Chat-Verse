const express = require("express");
const router = express.Router();
const {
	searchPeopleController,
} = require("../controllers/searchPeople.controller.js");

router.post("/search-people", searchPeopleController);

module.exports = router;
