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

const LoginFormComponent = () => {
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
        setLocalStorage({
          token: res.data.token,
          userId: res.data.userId,
          refreshToken: res.data.refreshToken,
        });
      })
      .catch((err) => {
        setBtnLoading(false);
        console.log(err);
        if (err.response && err.response.data.message) {
          message.error(err.response.data.message);
        } else if (err.response && err.response.data.error) {
          message.error(err.response.data.error);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  return (
    <div className="my-form-container">
      <div className="my-form-style">
        <Form layout="vertical" name="login-form" onFinish={handleSubmit}>
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
            <>
              <Input.Password placeholder="Enter password" />
              <span
                style={{
                  color: "grey",
                  fontSize: "0.8rem",
                  fontStyle: "italic",
                }}
              >
                Password should be atleast 6 characters
              </span>
            </>
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
          <br />
          <Link to="/forgot-password">
            <span className="my-link">Forgot Password?</span>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginFormComponent;
