import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

const FormComponent = ({ handleAddTodo }) => {
  const [validated, setValidated] = useState(false);

  const handleValidation = () => {
    setValidated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      handleAddTodo({
        name: e.target.formText.value,
        description: e.target.formDescription.value,
      });
      e.target.formText.value = "";
      e.target.formDescription.value = "";
    }
    handleValidation();
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Col xs={12} sm={6}>
          <Form.Group controlId="formText">
            <Form.Label>
              Name <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              size="sm"
              placeholder="Enter name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name
            </Form.Control.Feedback>
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
