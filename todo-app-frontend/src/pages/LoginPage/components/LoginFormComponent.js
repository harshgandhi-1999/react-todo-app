import React from "react";
import "./LoginFormComponent.css";
import { Form, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const LoginFormComponent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-form-container">
      <div className="login-form-style">
        <Form onSubmit={handleSubmit}>
          <div className="login-form-heading">Log-In</div>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%", marginBottom: "10px" }}
          >
            Log-In
          </Button>
          <Link to="/signup">
            <span className="register-link">
              Don't have an account? Register
            </span>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginFormComponent;
