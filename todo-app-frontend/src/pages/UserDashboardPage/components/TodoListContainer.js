import React from "react";
import { List } from "antd";
import "./TodoListContainer.css";
import TodoItem from "./TodoItem";

const TodoListContainer = ({ todos }) => {
  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <div className="empty-container">No Todos</div>
      ) : (
        <List
          header="hello"
          dataSource={todos}
          renderItem={(item) => {
            return <TodoItem item={item} />;
          }}
        />
      )}
    </div>
  );
};

export default TodoListContainer;
