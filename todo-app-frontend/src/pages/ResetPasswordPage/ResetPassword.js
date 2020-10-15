import React, { useState, useEffect } from "react";
import WelcomeNavbar from "../../components/WelcomeNavbar";
import { Input, Button, Form, message } from "antd";
import Label from "../../components/Label";
import "../formStyle.css";
import axiosInstance from "../../utils/axiosInstance";
import NotFound from "../NotFoundPage/NotFound";

const ResetPassword = (props) => {
  console.log(props);
  const [linkValid, setLinkValid] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const token = props.match.params.resetPasswordToken;

  useEffect(() => {
    console.log("kjhjnkjnkkjnkn");
    axiosInstance
      .get(`/checkTokenValid/${token}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.message === "OK") {
          setLinkValid(true);
        } else {
          setLinkValid(false);
        }
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.status === 401 &&
          err.response &&
          err.response.data.message
        ) {
          console.log(err.response);
          message.error(err.response.data.message);
          setLinkValid(false);
        } else if (err.response && err.response.data.message) {
          console.log(err.response);
          message.error(err.response.data.message);
        } else {
          message.error(err.message);
        }
      });
  }, [token]);

  const handleResetPassword = (e) => {
    console.log(e);
    if (e.new_password !== e.confirm_password) {
      message.error("New password and Confirm password do not match");
    } else {
      console.log(e);
      setBtnLoading(true);
      axiosInstance
        .post(`/setNewPassword/${token}`, {
          newPassword: e.new_password,
        })
        .then((res) => {
          setBtnLoading(false);
          console.log(res);
          message.success(res.data.message);
        })
        .catch((err) => {
          setBtnLoading(false);
          console.log(err);
          if (
            err.response.status === 401 &&
            err.response &&
            err.response.data.message
          ) {
            //   do not load the page
            setLinkValid(false);
            message.error(err.response.data.message);
          } else if (err.response && err.response.data.message) {
            message.error(err.response.data.message);
            console.log(err.response);
          } else {
            message.error(err.message);
            console.log(err.message);
          }
        });
    }
  };

  if (linkValid === false) {
    console.log(linkValid);
    return <NotFound history={props.history} />;
  }

  return (
    <>
      <WelcomeNavbar />
      <div className="my-form-style" style={{ textAlign: "center" }}>
        <div>
          <Form
            layout="vertical"
            name="reset-password-form"
            onFinish={handleResetPassword}
          >
            <div className="my-form-heading">Reset Password</div>
            <Form.Item
              label={<Label text="New Password" />}
              name="new_password"
              rules={[
                { required: true, message: "Please provide new password!" },
              ]}
              style={{ marginBottom: "10px" }}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>
            <Form.Item
              label={<Label text="Confirm Password" />}
              name="confirm_password"
              rules={[
                { required: true, message: "Please provide confirm password!" },
              ]}
              style={{ marginBottom: "10px" }}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", margin: "20px 0", fontWeight: "500" }}
              loading={btnLoading}
            >
              RESET
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
