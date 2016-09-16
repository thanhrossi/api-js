"use strict";
var express = require("express"),
	router = express.Router(),
	controllerAuth = require("../controller/auth");

router.post("/register", controllerAuth.register);
router.post("/login", controllerAuth.login);

module.exports = router;