import React from "react";
import { Card } from "react-bootstrap";
import FormComponent from "./FormComponent";

const AddTodoComponent = () => {
  return (
    <div>
      <Card
        style={{ backgroundColor: "transparent", border: "1px solid orange" }}
      >
        <Card.Body>
          <Card.Title>Add Todo</Card.Title>
          <FormComponent />
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddTodoComponent;
