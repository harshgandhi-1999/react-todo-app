const mongoose = require("mongoose");
const Todo = require("../models/todo");

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
  role: {
    type: Number,
    default: 0,
  },
});

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
