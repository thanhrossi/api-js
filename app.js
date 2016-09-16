var express  = require("express"),
	app = express(),
	morgan = require("morgan"),
	bookRoute = require("./route/book"),
	authRoute = require("./route/auth"),
	bodyParser = require('body-parser')
	errors = require("./errors"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	mongoose.Promise = global.Promise,
	connString = "mongodb://localhost:27017/demoApi";

mongoose.connect(connString);
global.Book = require("./model/book"),
global.User = require("./model/user");
require("./passport");

mongoose.connection.on("connected", function(){
	console.log("connected mongodb");
});

app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
app.use(passport.initialize());


app.use("/", authRoute);
app.use("/api", bookRoute);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json(err);
    }
});


app.use("*", function(req, res){
	res.status(404).json(errors.routeNotExists);
});
app.listen(3000);