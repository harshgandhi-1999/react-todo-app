const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const { signup, signin, signout } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("email", "email is required").isEmail(),
    check("password", "password should be atleaast 3 char").isLength({
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

router.get("/signout", signout);

module.exports = router;
