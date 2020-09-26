const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const tokenList = {};

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
          role: user.role,
        };
        const accessToken = jwt.sign(userData, process.env.SECRET_KEY, {
          expiresIn: "5m",
        });

        const refreshToken = jwt.sign(
          userData,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "30d",
          }
        );

        tokenList[refreshToken] = {
          token: accessToken,
          userId: user._id,
        };

        return res.status(200).json({
          message: "Login Successfull",
          userId: user._id,
          token: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        return res.status(401).json({
          message: "Email or password is incorrect",
        });
      }
    });
  });
};

exports.setToken = (req, res, next) => {
  //
  const userId = req.body.userId;
  const refreshToken = req.body.refreshToken;
  if (refreshToken && refreshToken in tokenList) {
    const userData = {
      userId: userId,
      role: 0,
    };

    const accessToken = jwt.sign(userData, process.env.SECRET_KEY, {
      expiresIn: "5m",
    });

    tokenList[refreshToken].token = accessToken;

    res.status(200).json({
      token: accessToken,
    });
  } else {
    res.status(404).json({
      message: "Invalid request",
    });
  }
  next();
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
      message: err.name,
    });
  }
  console.log("authorized");
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  // console.log(req.profile);
  // console.log(req.auth);
  if (!checker) {
    return res.status(401).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN,Acesss Denied",
    });
  }
  next();
};
