import React from "react";
import "./MainContent.css";
import AddTodoComponent from "../components/AddTodoComponent";
import TodoListComponent from "./TodoListComponent";

const MainContent = () => {
  return (
    <div className="main-content-style">
      <AddTodoComponent />
      <TodoListComponent />
    </div>
  );
};

export default MainContent;
