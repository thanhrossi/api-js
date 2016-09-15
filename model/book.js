"use strict";
var mongoose = require("mongoose"),
	reviewSchema = require("./review"),
	bookSchema = new mongoose.Schema({
		ID: Number,
	    Title: String,
	    SubTitle: String,
	    Description: String,
	    Image: String,
	    isbn: {
	    	type: String,
	    	require: true,
	    	unique: true
	    },
	    reviews : [reviewSchema],
	    ratingAvg: {
	    	type: Number,
	    	default: 0
	    }
	});

module.exports = mongoose.model("book", bookSchema, "book");
