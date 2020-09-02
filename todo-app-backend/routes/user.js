const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { check, validationResult } = require("express-validator");

const {
  getUserById,
  getUserInfo,
  updateUserInfo,
  deleteAccount,
} = require("../controllers/user");

const { isSignedIn, isAuthorized } = require("../controllers/auth");

router.param("userId", getUserById);

// get user info GET route
router.get("/user/:userId", isSignedIn, isAuthorized, getUserInfo);

router.put(
  "/user/:userId",
  isSignedIn,
  isAuthorized,
  [check("email", "Please provide valid email id").isEmail()],
  updateUserInfo
);

router.delete("/user/delete/:userId", isSignedIn, isAuthorized, deleteAccount);

module.exports = router;
