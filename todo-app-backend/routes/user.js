const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { check, validationResult } = require("express-validator");

const {
  getUserById,
  getUserInfo,
  updateUserInfo,
  deleteAccount,
  resetPassword,
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

router.put(
  "/user/resetPassword/:userId",
  isSignedIn,
  isAuthorized,
  [
    check(
      "currentPassword",
      "password should be atleaast 3 characters"
    ).isLength({
      min: 3,
    }),
    check("newPassword", "password should be aleast 3 characters").isLength({
      min: 3,
    }),
  ],
  resetPassword
);

module.exports = router;
