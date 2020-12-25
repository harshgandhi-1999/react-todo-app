const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("username", "username is required"),
    check("email", "Please provide valid email id").isEmail(),
    check("password", "Password should be atleaast 6 characters").isLength({
      min: 6,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Please provide valid email id").isEmail(),
    check("password", "Password should be atleast 6 characters").isLength({ min: 6 }),
  ],
  signin
);
module.exports = router;
