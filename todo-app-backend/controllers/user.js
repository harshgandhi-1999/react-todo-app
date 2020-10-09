const User = require("../models/user");
const Todo = require("../models/todo");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.getUserById = (req, res, next, id) => {
  //
  User.findById(id)
    .select("username email")
    .exec((err, user) => {
      if (err) {
        return res.status(404).json({
          error: err,
          message: "User not found",
        });
      }
      req.profile = user;
      next();
    });
};

exports.getUserInfo = (req, res) => {
  return res.json(req.profile);
};

exports.updateUserInfo = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const userInfo = req.profile;
  userInfo.username = req.body.username;
  userInfo.email = req.body.email;
  userInfo.save((err, updatedUser) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Failed to update user info",
      });
    }

    res.status(200).json({
      updatedUser: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
      message: "User info updated successfully",
    });
  });
};

exports.deleteAccount = (req, res) => {
  User.deleteOne({ _id: req.profile._id }).exec((err, result) => {
    if (err) {
      console.log("Account deletion error");
      return res.status(400).json({
        error: err,
        message: "Unable to delete account",
      });
    }
    res.status(200).json({
      deletedAccount: {
        username: result.username,
        email: result.email,
      },
      message: "Account deleted successfully",
    });
  });
};

exports.resetPassword = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const { currentPassword, newPassword } = req.body;
  bcrypt.compare(currentPassword, req.profile.password, (err, result) => {
    console.log("error", err);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    if (result) {
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: "Password reset failed!",
          });
        }

        User.findByIdAndUpdate(req.profile._id, {
          $set: { password: hashedPassword },
        }).exec((err, result) => {
          if (err) {
            return res.status(400).json({
              error: err,
              message: "Password reset failed!",
            });
          }

          res.status(200).json({
            message: "Password updated successfully",
          });
        });
      });
    } else {
      return res.status(400).json({
        message: "Current Password is incorrect",
      });
    }
  });
};
