import React from "react";
import { Form, Button, Col } from "react-bootstrap";

const FormComponent = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleAddTodo({
      name: e.target.formText.value,
      description: e.target.formDescription.value,
    });
    e.target.formText.value = "";
    e.target.formDescription.value = "";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col xs={12} sm={6}>
          <Form.Group controlId="formText">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" size="sm" placeholder="Enter name" />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" size="sm" placeholder="Description" />
          </Form.Group>
        </Col>
      </Form.Row>

      <Button variant="primary" type="submit">
        Add Todo
      </Button>
    </Form>
  );
};

export default FormComponent;
