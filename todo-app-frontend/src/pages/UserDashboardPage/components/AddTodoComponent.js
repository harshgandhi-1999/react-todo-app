import React from "react";
import FormComponent from "./FormComponent";
import {Collapse } from "antd";
import "./AddTodoComponent.css";

const {Panel} = Collapse;

const AddTodoComponent = ({ handleAddTodo, btnLoading }) => {
  return (
    <>
    <div className="add-todo-form-style">
      <Collapse style={{backgroundColor: 'transparent',border:'none'}}>
        <Panel header={<div style={{ color: "#fff" }}>ADD TODO</div>} style={{border: 'none',color: '#fff'}}>
          <FormComponent handleAddTodo={handleAddTodo} btnLoading={btnLoading}/>
        </Panel>
      </Collapse>
    </div>
    </>
  );
};
export default AddTodoComponent;
