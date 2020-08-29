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

  const handleDelete = (item) => {
    console.log(item);
  };

  return (
    <div className="main-content-style">
      <AddTodoComponent handleAddTodo={handleAddTodo} />
      <TodoListComponent
        todos={todos}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MainContent;

// {
/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body style={{ backgroundColor: "transparent" }}>
          Todo Completed
        </Toast.Body>
      </Toast> */
// }
