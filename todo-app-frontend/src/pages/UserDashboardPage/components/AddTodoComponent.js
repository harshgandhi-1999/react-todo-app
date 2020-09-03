import React from "react";
import { Card } from "react-bootstrap";
import FormComponent from "./FormComponent";

const AddTodoComponent = (props) => {
  return (
    <div>
      <Card
        style={{
          backgroundColor: "#343a40",
          border: "2px solid orange",
          borderRadius: "20px",
          boxShadow: "-5px 5px 20px rgba(0,0,0,0.5)",
        }}
      >
        <Card.Body>
          <Card.Title>Add Todo</Card.Title>
          <FormComponent handleAddTodo={props.handleAddTodo} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddTodoComponent;
