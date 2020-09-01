const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

const {
  getTodoById,
  getAllTodos,
  createTodoItem,
  deleteTodoItem,
  completeTodoItem,
  updateTodoItem,
} = require("../controllers/todo");

const { isSignedIn, isAuthorized } = require("../controllers/auth");

router.param("todoItemId", getTodoById);

// get all todos get route
router.get("/get-all-todos", getAllTodos);

// create todo post route
router.post("/create-todo", createTodoItem);

// delete todo item delete route
router.delete("/delete-todo/:todoItemId", deleteTodoItem);

// complete todo item put route
router.put("/complete-todo/:todoItemId", completeTodoItem);

// update todo item info put route
router.put("/update-todo/:todoItemId", updateTodoItem);

module.exports = router;
