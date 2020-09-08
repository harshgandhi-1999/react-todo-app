import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignupForm.css";
import { API } from "../../../utils/api";
import axios from "axios";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const SignupFormComponent = ({
  history,
  setShow,
  settoastHeader,
  settoastBody,
}) => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLoading(true);
      e.persist();
      const data = JSON.stringify({
        username: e.target.formName.value,
        email: e.target.formEmail.value,
        password: e.target.formPassword.value,
      });

      axios
        .post(`${API}/signup`, data, config)
        .then((res) => {
          setLoading(false);
          settoastHeader(res.data.message);
          settoastBody("Redirecting to login page ...");
          setShow(true);
          setTimeout(() => {
            history.push("/login");
          }, 2500);
        })
        .catch((err) => {
          setLoading(false);
          if (err.response) {
            settoastHeader("SignUp Failed");
            settoastBody(err.response.data.message);
            setShow(true);
            console.log(err.response);
          } else {
            console.log(err);
          }
        });
    }

    setValidated(true);
  };

  return (
    <div className="signup-form-container">
      <div className="signup-form-style">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="signup-form-heading">Sign-Up</div>
          <Form.Group controlId="formName">
            <Form.Label style={{ fontWeight: "500" }}>
              Username<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="Username" required />
            <Form.Control.Feedback type="invalid">
              Please provide a username
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label style={{ fontWeight: "500" }}>
              Email address<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control type="email" placeholder="Email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label style={{ fontWeight: "500" }}>
              Password<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              pattern=".{3,}"
            />
            <Form.Control.Feedback type="invalid">
              Password should be atleast 3 chars
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "100%", marginBottom: "10px", fontWeight: "500" }}
            disabled={loading}
          >
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {"   "}
            SIGNUP
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
