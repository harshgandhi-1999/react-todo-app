const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');


// transporter for sending mail
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASSWORD,
  }
})

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

  User.findById(req.profile._id).select('password')
  .exec((err,user)=>{
    if(err || !user){
        return res.status(404).json({
          error: err,
          message: "User not found",
        }); 
    }

    // compare password first
    bcrypt.compare(currentPassword,user.password, (err, result) => {
      console.log("error", err);
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      // if matched 
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
        // if not matched
        return res.status(400).json({
          message: "Current Password is incorrect",
        });
      }
    });
  })
};

exports.changePassword = (req,res)=>{
  const email = req.body.email;
  User.findOne({email:email})
  .select("email username resetPasswordToken resetPasswordExpires")
  .exec((err,user)=>{
    if(err || !user){
      return res.status(404).json({
        error: err,
        message: "User not found",
      })
    }

    user.generatePasswordReset(); //method in userschema

    user.save((err,updatedUser)=>{
      if(err){
        return res.status(500).json({
          error: err,
          message: "Internal Server error"
        })
      }

      console.log(updatedUser);
      let link = "http://" + req.headers.host + "/auth/reset/" + updatedUser.resetPasswordToken;
      
      const mailOptions = {
        from: 'harshgandhi1701@gmail.com', // sender address
        to: 'harshgandhi043@gmail.com', // list of receivers
        subject: 'TODO APP RESET PASSWORD REQUEST', // Subject line
        text:  `Hi, ${updatedUser.username}\n 
        Please click on the following link ${link} to reset your password. \n\n 
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions,(err, info) => {
        if(err){
          console.log(err)
          return res.status(500).json({error: err,message: "Internal Server Error"});
        }
        console.log(info);
        res.status(200).json({message: 'A reset password link has been sent to ' + updatedUser.email + '.'});
      });
    })
  })
}