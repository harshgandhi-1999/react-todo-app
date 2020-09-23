import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { Link } from "react-router-dom";
import "../../formStyle.css";
import Label from "../../../components/Label";
import { useAuth } from "../../../context/auth";
import axiosInstance from "../../../utils/axiosInstance";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const LoginFormComponent = ({ setIsLoggedIn }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const { setLocalStorage } = useAuth();

  const handleSubmit = (e) => {
    setBtnLoading(true);
    const data = JSON.stringify({
      email: e.email,
      password: e.password,
    });
    axiosInstance
      .post("/signin", data, config)
      .then((res) => {
        setBtnLoading(false);
        message.success(res.data.message);
        // localStorage.setItem("Token", res.data.token);
        setLocalStorage({
          token: res.data.token,
          userId: res.data.userId,
        });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setBtnLoading(false);
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
            loading={btnLoading}
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
