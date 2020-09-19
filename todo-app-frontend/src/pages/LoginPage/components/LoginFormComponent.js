import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { API } from "../../../utils/api";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../formStyle.css";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const Label = ({ text }) => {
  return <span className="my-label-style">{text}</span>;
};

const LoginFormComponent = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    setLoading(true);
    const data = JSON.stringify({
      email: e.email,
      password: e.password,
    });
    axios
      .post(`${API}/signin`, data, config)
      .then((res) => {
        setLoading(false);
        message.success(res.data.message);
        localStorage.setItem("Token", res.data.token);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          message.error(err.response.data.message);
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  return (
    <div className="my-form-container">
      <div className="my-form-style">
        <Form
          layout="vertical"
          name="login-form"
          requiredMark="optional"
          onFinish={handleSubmit}
        >
          <div className="my-form-heading">Log-In</div>
          <Form.Item
            label={<Label text="Email Id" />}
            name="email"
            rules={[
              { required: true, message: "Please provide your email id!" },
            ]}
            style={{ marginBottom: "10px" }}
          >
            <Input type="email" placeholder="Enter email id" />
          </Form.Item>
          <Form.Item
            label={<Label text="Password" />}
            name="password"
            rules={[
              { required: true, message: "Please provide your password!" },
            ]}
            style={{ marginBottom: "10px" }}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", margin: "10px 0", fontWeight: "500" }}
            loading={loading}
          >
            LOGIN
          </Button>
          <Link to="/signup">
            <span className="my-link">Don't have an account? Register</span>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginFormComponent;
