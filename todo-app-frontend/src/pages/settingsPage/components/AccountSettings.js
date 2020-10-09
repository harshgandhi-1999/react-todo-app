import React, { useRef, useEffect, useState } from "react";
import { Form, Button, Input, Row, Col, Typography, message } from "antd";
import Label from "../../../components/Label";
import { useAuth } from "../../../context/auth";
import axiosInstance from "../../../utils/axiosInstance";

const { Title } = Typography;

const AccountSettings = ({ setPageLoading }) => {
  const [btnLoading, setbtnLoading] = useState(false);
  const account_form_ref = useRef();
  const { authUser, logout,setUsername } = useAuth();

  function fetchUserInfo(){
    setPageLoading(true);
    axiosInstance
        .get(`/user/${authUser}`)
        .then((res) => {
          console.log(res);
          setPageLoading(false);
          account_form_ref.current.setFieldsValue({
            username: res.data.username,
            email: res.data.email,
          });
        })
        .catch((err) => {
          setPageLoading(false);
          if (err.response) {
            if (err.response.status === 401) {
              logout();
            } else {
              message.error("Unable to fetch User details");
            }
            console.log(err.response);
          } else {
            message.error(err.message);
            console.log(err.message);
          }
        });
  }

  useEffect(() => {
    if (authUser !== null) {
      fetchUserInfo();
    }
  }, [authUser]);

  const updateAccountInfo = (e) => {
    console.log(e);
    setbtnLoading(true);
    axiosInstance.put(`/user/${authUser}`,{
      username: e.username,
      email: e.email,
    })
    .then(res=>{
      console.log(res);
      setbtnLoading(false);
      message.success(res.data.message);
      setUsername(res.data.updatedUser.username)
    })
    .catch(err=>{
      setbtnLoading(false);
      if (err.response) {
        if (err.response.status === 401) {
          logout();
        } else {
          message.error(err.response.data);
        }
        console.log(err.response);
      } else {
        message.error(err.message);
        console.log(err.message);
      }
    })
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <Title className="account-title" level={4} style={{ color: "#fff" }}>
        Account
      </Title>
      <div className="account-container">
        <Form
          layout="vertical"
          name="update-account-info"
          ref={account_form_ref}
          onFinish={updateAccountInfo}
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label={<Label text="Username" style={{ color: "#fff" }} />}
                name="username"
                rules={[
                  { required: true, message: "Please provide username!" },
                ]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label={<Label text="Email" style={{ color: "#fff" }} />}
                name="email"
                rules={[
                  { required: true, message: "Please provide email id!" },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" loading={btnLoading}>
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettings;
