import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "../../formStyle.css";
import Label from "../../../components/Label";
import axiosInstance from "../../../utils/axiosInstance";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const SignupFormComponent = ({ history }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSubmit = (e) => {
    setBtnLoading(true);
    const data = JSON.stringify({
      username: e.username,
      email: e.email,
      password: e.password,
    });

    axiosInstance
      .post("/signup", data, config)
      .then((res) => {
        setBtnLoading(false);
        message.success(res.data.message);
        setTimeout(() => {
          history.push("/login");
        }, 1000);
      })
      .catch((err) => {
        setBtnLoading(false);
        console.log(err);
        if (err.response) {
          message.error(err.response.data.message);
        } else {
          message.error(err.message);
        }
      });
  };

  return (
    <div className="my-form-container">
      <div className="my-form-style">
        <Form layout="vertical" name="signup-form" onFinish={handleSubmit}>
          <div className="my-form-heading">Sign-Up</div>
          <Form.Item
            label={<Label text="Username" />}
            name="username"
            rules={[
              { required: true, message: "Please provide your username!" },
            ]}
            style={{ marginBottom: "10px" }}
          >
            <Input type="text" placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            label={<Label text="Email" />}
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
            loading={btnLoading}
          >
            SIGNUP
          </Button>
          <Link to="/login">
            <span className="my-link">Already have an account? Login</span>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default SignupFormComponent;
