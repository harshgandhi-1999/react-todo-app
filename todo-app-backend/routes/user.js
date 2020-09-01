const express = require("express");
const router = express.Router();
const User = require("../models/user");

//
const { getUser, getUserById } = require("../controllers/user");

router.param("userId", getUserById);

// get user info GET route
router.get("/user/:userId", getUser);

module.exports = router;
