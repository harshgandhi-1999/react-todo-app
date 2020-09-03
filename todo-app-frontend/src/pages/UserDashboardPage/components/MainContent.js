import React, { useState } from "react";
import "./MainContent.css";
import AddTodoComponent from "./AddTodoComponent";
import TodoListComponent from "./TodoListComponent";
import ConfirmModal from "./ConfirmModal";

const MainContent = () => {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState({});
  // const [validated, setValidated] = useState(false);

  // const handleValidation = () => {
  //   setValidated(true);
  //   console.log("true");
  // };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddTodo = ({ name, description }) => {
    setTodos((prevState) => [
      ...prevState,
      {
        id: prevState.length === 0 ? 1 : prevState[prevState.length - 1].id + 1,
        name: name,
        description: description,
        completed: false,
      },
    ]);
  };

  const handleComplete = (item) => {
    const newTodos = todos.map((el) =>
      el.id === item.id ? { ...el, completed: true } : el
    );
    setTodos(newTodos);
  };

  const handleDelete = (item, flag) => {
    if (flag === false) {
      handleShow();
    } else {
      handleClose();
      const newTodos = todos.filter((el) => el.id !== item.id);
      setTodos(newTodos);
    }
  };

  const handleItemToBeDeleted = (item) => {
    console.log("item = ", item);
    if (item.completed === false) {
      setItemToBeDeleted(item);
      console.log("itemToBeDeleted = ", itemToBeDeleted);
      handleDelete(item, false);
    } else {
      handleDelete(item, true);
    }
  };

  return (
    <div className="main-content-style">
      <ConfirmModal
        show={show}
        itemToBeDeleted={itemToBeDeleted}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <AddTodoComponent handleAddTodo={handleAddTodo} />
      <TodoListComponent
        todos={todos}
        handleComplete={handleComplete}
        handleItemToBeDeleted={handleItemToBeDeleted}
      />
    </div>
  );
};

export default MainContent;
