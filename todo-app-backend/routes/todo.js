const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  getTodoById,
  getAllTodos,
  createTodoItem,
  deleteTodoItem,
  completeTodoItem,
  updateTodoItem,
} = require("../controllers/todo");

const { isSignedIn, isAuthorized } = require("../controllers/auth");

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.param("todoItemId", getTodoById);

// get all todos get route
router.get("/get-all-todos/:userId", isSignedIn, isAuthorized, getAllTodos);

// create todo post route
router.post(
  "/create-todo/:userId",
  isSignedIn,
  isAuthorized,
  [check("name", "name is required")],
  createTodoItem
);

// delete todo item delete route
router.delete(
  "/delete-todo/:userId/:todoItemId",
  isSignedIn,
  isAuthorized,
  deleteTodoItem
);

// complete todo item put route
router.put(
  "/complete-todo/:userId/:todoItemId",
  isSignedIn,
  isAuthorized,
  completeTodoItem
);

// update todo item info put route
router.put(
  "/update-todo/:userId/:todoItemId",
  isSignedIn,
  isAuthorized,
  updateTodoItem
);

module.exports = router;
