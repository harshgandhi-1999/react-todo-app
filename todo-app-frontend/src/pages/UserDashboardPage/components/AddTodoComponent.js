import React from "react";
import FormComponent from "./FormComponent";
import { Card } from "antd";
import "./AddTodoComponent.css";

const AddTodoComponent = (props) => {
  return (
    <>
      <Card title="Add Todo" bordered={false} className="add-todo-form-style">
        <FormComponent handleAddTodo={props.handleAddTodo} />
      </Card>
    </>
  );
};

export default AddTodoComponent;
