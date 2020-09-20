import React from "react";
import FormComponent from "./FormComponent";
import { Card } from "antd";
import "./AddTodoComponent.css";

const AddTodoComponent = ({ handleAddTodo, btnLoading }) => {
  return (
    <>
      <Card
        title={<div style={{ color: "#fff" }}>ADD TODO</div>}
        bordered={false}
        className="add-todo-form-style"
      >
        <FormComponent handleAddTodo={handleAddTodo} btnLoading={btnLoading} />
      </Card>
    </>
  );
};

export default AddTodoComponent;
