var express  = require("express"),
	app = express(),
	morgan = require("morgan"),
	bookRoute = require("./route/book"),
	bodyParser = require('body-parser')
	errors = require("./errors"),
	mongoose = require("mongoose"),
	connString = "mongodb://localhost:27017/demoApi";

mongoose.connect(connString);
global.Book = require("./model/book");

mongoose.connection.on("connected", function(){
	console.log("connected mongodb");
});

app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get("/", function (req, res) {
	res.send("hello ,tao la Thanh !");
});

app.use("/api", bookRoute);
app.use("*", function(req, res){
	res.status(404).json(errors.routeNotExists);
});
app.listen(3000);