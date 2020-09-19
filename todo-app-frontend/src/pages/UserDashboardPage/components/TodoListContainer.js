import React from "react";
import { Card } from "antd";
import "./TodoListContainer.css";
import TodoList from "./TodoList";

const TodoListContainer = (props) => {
  return (
    <div className="todo-list-container">
      <Card
        title="Todo List"
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        {props.todos.length === 0 ? (
          <div className="empty-container">No Todos</div>
        ) : (
          <TodoList {...props} />
        )}
      </Card>
    </div>
  );
};

export default TodoListContainer;
