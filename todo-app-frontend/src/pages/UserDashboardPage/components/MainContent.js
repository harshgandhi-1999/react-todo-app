import React, { useState } from "react";
import "./MainContent.css";
import AddTodoComponent from "./AddTodoComponent";
import TodoListContainer from "./TodoListContainer";

import { axiosInstance } from "../../../utils/axiosIntercepter";

const MainContent = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = ({ name, description }) => {
    // axiosInstance.post("/")
  };

  const fetchTodoList = () => {
    // fetch list
  };

  return (
    <div className="main-content-style">
      {/* <ConfirmModal
        show={show}
        itemToBeDeleted={itemToBeDeleted}
        handleClose={handleClose}
        handleDelete={handleDelete}
      /> */}
      <AddTodoComponent handleAddTodo={handleAddTodo} />
      <TodoListContainer todos={todos} />
    </div>
  );
};

export default MainContent;
