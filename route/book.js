"use strict";
var express = require("express"),
	router = express.Router(),
	bookController = require("../controller/book"),
	reviewController = require("../controller/review");

router.route("/books")
	.get(bookController.getListBooks)
	.post(bookController.createNewBook)
	.delete(bookController.deleteMultiBooks)
	.put(bookController.updateMultiBooks);

router.route("/books/:id")
	.get(bookController.getBook)
	.put(bookController.updateBook)
	.delete(bookController.deleteBook);

router.route("/books/:bookId/reviews")
	.get(reviewController.getListReviews)
	.post(reviewController.createNewReview);

router.route("/books/:bookId/reviews/:reviewId")
	.get(reviewController.getReview)
	.put(reviewController.updateReview)
	.delete(reviewController.deleteReview);

module.exports = router;