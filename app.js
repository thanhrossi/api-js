var express  = require("express"),
	app = express(),
	morgan = require("morgan"),
	bookRoute = require("./route/book"),
	bodyParser = require('body-parser');

app.use(morgan("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get("/", function (req, res) {
	res.send("hello ,tao la Thanh !");
});

app.use("/api", bookRoute);
app.listen(3000);