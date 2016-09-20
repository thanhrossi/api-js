"use strict";
var mongoose = require("mongoose"),
	config = require("../config"),
	RateBuckets = new mongoose.Schema({
		createdAt: {
			type: Date,
			require: true,
			default: Date.now,
			expires: config.rateLimits.ttl
		},
		ip: {
			type: String,
			required: true
		},
		hit: {
			type: Number,
			default: 1,
			required: true,
			min: 1,
			max: config.rateLimits.maxHits
		}
	});

module.exports = mongoose.model("RateBucket",RateBuckets);
