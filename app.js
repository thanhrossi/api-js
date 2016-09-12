var express  = require("express"),
	app = express(),
	morgan = require("morgan"),
	bookRoute = require("./route/book");

// app.use(function(req, res, next){
// 	// console.log("Middle ware 1");
// 	res.locals.thanh = "ahihi !";
// 	next();
// });
// app.use(function(req, res, next){
// 	// console.log("Middle ware 2");
// 	console.log(res.locals);
// 	next();
// });
app.use(morgan("dev"));

app.get("/", function (req, res) {
	res.send("hello ,tao la Thanh !");
});

app.use("/", bookRoute);
app.listen(3000);