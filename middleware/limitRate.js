"use strict";
var config = require("../config"),
	errors = require("../errors");

module.exports = function(req, res, next) {
	var ip = req.header['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress ;
	Bucket.findOneAndUpdate({ip: ip}, {$inc: {hits: 1}}, {upsert: false})
	.exec(function(err, rateBucket) {
		if(err) {
			res.status(500).json(err)
		}
		if(!rateBucket) {
			var date = new Date();
			rateBucket = new Bucket({
				createdAt: date,
				ip: ip
			});
			rateBucket.save(function(err){
				if(err) {
					res.status(500).json(err)
				}

				var timeUntilReset = config.rateLimits.ttl - (new Date().getTime() - date.getTime());

				res.set('X-Rate-Limit-Limit', config.rateLimits.maxHits);
                res.set('X-Rate-Limit-Remaining', config.rateLimits.maxHits - 1);
                res.set('X-Rate-Limit-Reset', timeUntilReset);
                req.rateBucket = rateBucket;
                return next();

			});
		}
		else {
            var timeUntilReset = config.rateLimits.ttl - (new Date().getTime() - rateBucket.createdAt.getTime()),
            	remaining = Math.max(0, (config.rateLimits.maxHits - rateBucket.hits));

            res.set('X-Rate-Limit-Limit', config.rateLimits.maxHits);
            res.set('X-Rate-Limit-Remaining', remaining);
            res.set('X-Rate-Limit-Reset', timeUntilReset);
            req.rateBucket = rateBucket;

            if (rateBucket.hits < config.rateLimits.maxHits) {
                return next();
            } else {
                return res.status(429).json(errors.manyRequest);
            }
        }
	});

};