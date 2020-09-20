import React from "react";
import { List } from "antd";
import "./TodoListContainer.css";
import TodoItem from "./TodoItem";

const TodoListContainer = ({ todos, handleDeleteTodo, loading }) => {
  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <div className="empty-container">No Todos</div>
      ) : (
        <List
          loading={loading}
          header="todo list"
          dataSource={todos}
          renderItem={(item) => {
            return <TodoItem item={item} handleDeleteTodo={handleDeleteTodo} />;
          }}
        />
      )}
    </div>
  );
};

export default TodoListContainer;
