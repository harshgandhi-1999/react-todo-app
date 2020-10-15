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
  sendLinkForResetPassword,
  checkTokenValid,
  setNewPassword,
  getToken,
} = require("../controllers/user");

const { isSignedIn, isAuthorized } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("resetPasswordToken", getToken);

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
      "Password should be atleast 6 characters"
    ).isLength({
      min: 6,
    }),
    check("newPassword", "Password should be aleast 6 characters").isLength({
      min: 6,
    }),
  ],
  resetPassword
);

// route for sending link to emailid for password reser
router.post(
  "/sendLink",
  [check("email", "Please provide valid email id").isEmail()],
  sendLinkForResetPassword
);

// check if link is valid or not
router.get("/checkTokenValid/:resetPasswordToken", checkTokenValid);

// route to set new password
router.post(
  "/setNewPassword/:resetPasswordToken",
  [
    check("newPassword", "Password should be atleaast 6 characters").isLength({
      min: 6,
    }),
  ],
  setNewPassword
);

module.exports = router;
