"use strict";
var express = require("express"),
	router = express.Router(),
	bookController = require("../controller/book");

router.get("/books",bookController.getListBooks);

module.exports = router;