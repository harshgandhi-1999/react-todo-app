import React from "react";
import "./LoginForm.css";
// import { Form, Button } from "react-bootstrap";
import { API } from "../../../utils/api";
import { Link } from "react-router-dom";
import axios from "axios";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const LoginFormComponent = () => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = JSON.stringify({
  //     email: e.target.formEmail.value,
  //     password: e.target.formPassword.value,
  //   });
  //   console.log(data);
  //   axios
  //     .post(`${API}/signin`, data, config)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div></div>
    // <div className="login-form-container">
    //   <div className="login-form-style">
    //     <Form onSubmit={handleSubmit}>
    //       <div className="login-form-heading">Log-In</div>
    //       <Form.Group controlId="formEmail">
    //         <Form.Label style={{ fontWeight: "500" }}>Email address</Form.Label>
    //         <Form.Control type="email" placeholder="Enter email" />
    //       </Form.Group>
    //       <Form.Group controlId="formPassword">
    //         <Form.Label style={{ fontWeight: "500" }}>Password</Form.Label>
    //         <Form.Control type="password" placeholder="Password" />
    //       </Form.Group>
    //       <Button
    //         variant="primary"
    //         type="submit"
    //         style={{ width: "100%", marginBottom: "10px", fontWeight: "500" }}
    //       >
    //         LOGIN
    //       </Button>
    //       <Link to="/signup">
    //         <span className="register-link">
    //           Don't have an account? Register
    //         </span>
    //       </Link>
    //     </Form>
    //   </div>
    // </div>
  );
};

export default LoginFormComponent;
