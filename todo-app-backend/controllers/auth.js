const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  //   find email if it already exists or not
  User.find({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    console.log(user);
    if (user.length >= 1) {
      return res.status(422).json({
        message: "This email id already exist",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          });
          user.save((err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).json({
                error: err,
                message: "Signup Failed",
              });
            }
            res.status(200).json({
              username: result.username,
              email: result.email,
              id: result._id,
              message: "Signup Successfull",
            });
          });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Email or password is incorrect",
      });
    }
    // comparing passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: err,
          message: "Email or password is incorrect",
        });
      }
      if (result) {
        // generate token
        const userData = {
          userId: user._id,
          // role: user.role,
        };
        const accessToken = jwt.sign(userData, process.env.SECRET_KEY, {
          expiresIn: "10m",
        });

        return res.status(200).json({
          message: "Login Successfull",
          userId: user._id,
          token: accessToken,
        });
      } else {
        return res.status(401).json({
          message: "Email or password is incorrect",
        });
      }
    });
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

exports.isAuthorized = (err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      status: err.status,
      message: err.code,
    });
  }
  console.log("authorized");
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(401).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

// exports.isAdmin = (req, res, next) => {
//   if (req.profile.role === 0) {
//     return res.status(403).json({
//       error: "You are not ADMIN,Acesss Denied",
//     });
//   }
//   next();
// };
