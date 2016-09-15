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

function findIndex (id) {
	return books.map(function(book) {
		return String(book.ID);
	}).indexOf(id);
}

exports.createBook = function(data, cb) {
	var bookIndex = findIndex(data.id);
	if(bookIndex > -1) {
		cb("Book existed !");
	}else {
		books.push(data);
		cb(null, books);
	}
};

exports.listBooks = function(cb) {
	cb(null, books);
};

exports.updateMultibooks = function(data, cb) {

};

exports.deleteMultibooks = function(){

};

exports.getBook = function(id, cb){
	var bookIndex = findIndex(id);
	if(bookIndex > -1) {
		cb(null, books[bookIndex]);
	}else{
		cb("Book not exist !");
	}
};

exports.updateBook = function(data, cb) {
	var bookIndex = findIndex(data.id);
	if(bookIndex > -1) {
		books[bookIndex] = data;
		cb(null, books[bookIndex]);
	}else{
		cb("Book not exist !");
	}
};

exports.deleteBook = function(id, cb) {
	var bookIndex = findIndex(data.id);
	if(bookIndex > -1) {
		array.splice(bookIndex, 1);
		cb(null, books[bookIndex]);
	}else{
		cb("Book not exist !");
	}
};