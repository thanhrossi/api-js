var mongoose = require("mongoose"),
	reviewSchema = new mongoose.Schema({
		author: String,
		rating: {type: Number, required: true, min: 0, max: 5},
		content: String,
		created_at: {
			type: Date,
			"default": Date.now
		}
	});
module.exports = reviewSchema;