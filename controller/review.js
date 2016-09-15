"use strict";
var errors = require("../errors");


exports.getListReviews = function (req,res) {
	Book.findOne({ID: req.params.bookId})
		.exec(function(err, data){
			if(err) return res.json(err);
			if(data){
				res.json(data.reviews);
			}else{
				res.status(404).json(errors.bookNotExists);
			}
		});
};

exports.createNewReview = function (req,res) {
	Book.findOne({ID: req.params.bookId})
		.exec(function(err, data){
			if(err) return res.json(err);
			if(data){
				var newReview = {
					author: req.body.author,
					rating: req.body.rating,
					content: req.body.content
				}

				data.reviews.push(newReview);
				data.save(function(err,book) {
					if(err) res.json(err);
					res.status(201).json();
				});

			}else{
				res.status(404).json(errors.bookNotExists);
			}
		});
};

exports.getReview = function (req,res) {
	Book.findOne({ID: req.params.bookId})
		.exec(function(err, data){
			if(err) return res.json(err);
			if(data){
				var review = data.reviews.id(req.params.reviewId);
				if(review) {
					res.json(review);
				}else{
					res.status(404).json(errors.reviewNotExists);
				}
				
			}else{
				res.status(404).json(errors.BookNotExists);
			}
		});
};

exports.updateReview = function (req,res) {
	Book.findOne({ID: req.params.bookId})
		.exec(function(err, data){
			if(err) return res.json(err);
			if(data){
				var review = data.reviews.id(req.params.reviewId);
				if(review) {
					review.author = req.body.author || review.author;
					review.rating = req.body.rating || review.rating;
					review.content = req.body.content || review.content;

					data.save(function(err,book) {
						if(err) res.json(err);
						res.status(200).json();
					});
				}else{
					res.status(404).json(errors.reviewNotExists);
				}
				
			}else{
				res.status(404).json(errors.BookNotExists);
			}
		});
};

exports.deleteReview = function (req,res) {
	Book.findOne({ID: req.params.bookId})
		.exec(function(err, data){
			if(err) return res.json(err);
			if(data){
				var review = data.reviews.id(req.params.reviewId);
				if(review) {
					review.remove();
					data.save(function(err,book) {
						if(err) res.json(err);
						res.status(200).json();
					});
				}else{
					res.status(404).json(errors.reviewNotExists);
				}
				
			}else{
				res.status(404).json(errors.BookNotExists);
			}
		});
};