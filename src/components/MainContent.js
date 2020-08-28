import React, { useState } from "react";
import "./MainContent.css";
import AddTodoComponent from "../components/AddTodoComponent";
import TodoListComponent from "./TodoListComponent";

const MainContent = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = ({ name, description }) => {
    setTodos((prevState) => [
      ...prevState,
      {
        name: name,
        description: description,
      },
    ]);
  };

  return (
    <div className="main-content-style">
      <AddTodoComponent handleAddTodo={handleAddTodo} />
      <TodoListComponent todos={todos} />
    </div>
  );
};

export default MainContent;
