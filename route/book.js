"use strict";
var express = require("express"),
	router = express.Router(),
	bookController = require("../controller/book");

router.route("/books")
	.get(bookController.getListBooks)
	.post(bookController.createNewBook)
	.delete(bookController.deleteMultiBooks)
	.put(bookController.updateMultiBooks);

router.route("/books/:id")
	.get(bookController.getBook)
	.put(bookController.updateBook)
	.delete(bookController.deleteBook);
module.exports = router;