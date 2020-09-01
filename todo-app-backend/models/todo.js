const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 2000,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
