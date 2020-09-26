const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  signup,
  signin,
  setToken,
  isSignedIn,
  isAuthorized,
} = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("username", "username is required"),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleaast 3 characters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field required").isLength({ min: 1 }),
  ],
  signin
);

router.post("/token", setToken);

module.exports = router;
