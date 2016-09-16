"use strict";
var passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy({
	usernameField: "email"
}, function (username, password, done) {
	User.findOne({email: username}, function(err, user) {
		if(err) return done(err);
		if(!user) {
			return done(null, false, {
				message: "Incorrect username or password"
			});
		}
		if(!user.checkPassword(password)) {
			return done(null, false, {
				message: "Incorrect username or password"
			});
		}
		return done(null, user);
	})	
}));

