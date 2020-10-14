const mongoose = require("mongoose");
const Todo = require("../models/todo");
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    required: false
  },

  resetPasswordExpires: {
    type: Date,
    required: false
  }
},{timestamps: true});

userSchema.methods.generatePasswordReset = function(){
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 600000;
}

userSchema.pre("deleteOne", { document: false, query: true }, function (next) {
  Todo.deleteMany({ createrId: this.getQuery()._id }).exec((err, result) => {
    if (err) {
      console.log("Error in deleting todos: ", err);
    } else {
      console.log("Total deleted todos : ", result);
    }
  });
  next();
});

module.exports = mongoose.model("User", userSchema);
