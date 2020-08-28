import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col xs={12} sm={6}>
          <Form.Group controlId="formText">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
            />
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
