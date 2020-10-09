const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, signin } = require("../controllers/auth");

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
    check("email", "Please provide valid email id").isEmail(),
    check("password", "Password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signin
);
module.exports = router;
