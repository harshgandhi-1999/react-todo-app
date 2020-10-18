import React, { useState } from "react";
import { Input, Button, message } from "antd";
import WelcomeNavbar from "../../components/WelcomeNavbar";
import "../formStyle.css";
import { Link } from "react-router-dom";
import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axiosInstance";

const ForgotPassword = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendLink = () => {
    if (email.length > 0) {
      setBtnLoading(true);
      axiosInstance
        .post("/sendLink", { email: email })
        .then((res) => {
          setBtnLoading(false);
          message.success(res.data.message);
          setEmail("");
        })
        .catch((err) => {
          setBtnLoading(false);
          console.log(err);
          if (err.response && err.response.data.message) {
            message.error(err.response.data.message);
          } else {
            message.error(err.message);
          }
        });
    } else {
      message.error("Email id is required");
    }
  };

  return (
    <>
      <WelcomeNavbar />
      <div className="my-form-style" style={{ textAlign: "center" }}>
        <LockOutlined style={{ fontSize: "4rem", marginBottom: "10px" }} />
        <div className="my-form-heading">Forgot Password</div>
        <div>
          <p style={{ color: "#808080" }}>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
          <div
            style={{ textAlign: "left", marginBottom: "10px" }}
            className="my-label-style"
          >
            Email <span style={{ color: "red", fontSize: "1rem" }}>*</span>
          </div>
          <Input
            placeholder="Enter email id"
            value={email}
            prefix={<UserOutlined />}
            onChange={handleChange}
            onPressEnter={handleSendLink}
          />
          <Button
            type="primary"
            style={{ width: "100%", margin: "20px 0", fontWeight: "500" }}
            loading={btnLoading}
            onClick={handleSendLink}
          >
            CONTINUE
          </Button>
          <Link to="/login" style={{ color: "#808080" }}>
            <LeftOutlined /> <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
