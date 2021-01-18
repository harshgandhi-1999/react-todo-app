const Todo = require("../models/todo");
const { check, validationResult } = require("express-validator");

exports.getTodoById = (req, res, next, id) => {
  Todo.findById(id).exec((err, item) => {
    if (err || !item) {
      return res.status(400).json({
        error: "Item not found",
      });
    }
    req.todoItem = item;
    next();
  });
};

exports.getAllTodos = (req, res) => {
  Todo.find({ createrId: req.profile._id }).exec((err, items) => {
    if (err) {
      return res.status(404).json({
        error: err,
        message: "Unable to fetch items",
      });
    }
    res.status(200).json({
      items,
    });
  });
};

exports.createTodoItem = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const todoItem = new Todo({
    createrId: req.profile._id,
    name: req.body.name.toLowerCase(),
    description: req.body.description,
  });

  todoItem.save((err, savedItem) => {
    if (err) {
      return res.status(404).json({
        error: err,
        message: "Item not created",
      });
    }

    res.status(200).json({
      createdItem: savedItem,
      message: "TODO item created successfully",
    });
  });
};

exports.deleteTodoItem = (req, res) => {
  let todoItem = req.todoItem;
  todoItem.remove((err, deletedItem) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Failed to delete item",
      });
    }

    res.status(200).json({
      message: "TODO item was successfully deleted",
      deletedItem: deletedItem,
    });
  });
};

exports.completeTodoItem = (req, res) => {
  let todoItem = req.todoItem;
  todoItem.completed = true;
  todoItem.save((err, completedTask) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Failed to complete task",
      });
    }

    res.status(200).json({
      message: "Task Completed",
      completedTask: completedTask,
    });
  });
};

exports.updateTodoItem = (req, res) => {
  let todoItem = req.todoItem;
  todoItem.name = req.body.name;
  todoItem.description = req.body.description;
  todoItem.save((err, updatedItem) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "Failed to update TODO item",
      });
    }

    res.status(200).json({
      message: "TODO item updated successfully",
      updatedItem: updatedItem,
    });
  });
};
