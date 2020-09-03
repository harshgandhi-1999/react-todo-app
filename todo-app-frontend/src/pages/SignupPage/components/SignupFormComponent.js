import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignupForm.css";

const SignupFormComponent = () => {
  return (
    <div className="signup-form-container">
      <div className="signup-form-style">
        <Form>
          <div className="signup-form-heading">Sign-Up</div>
          <Form.Group controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email" />
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
            Sign-Up
          </Button>
          <Link to="/login">
            <span className="login-link">Already have an account? Login</span>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default SignupFormComponent;
