import React from "react";
import { Form, Button, Input, Row, Col, Typography } from "antd";
import Label from "../../../components/Label";

const { Title } = Typography;

const ResetPassword = () => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Title level={4} style={{ color: "#fff" }}>
        Change Your Password
      </Title>
      <div className="reset-password-container">
        <Form layout="vertical" name="update-password-form">
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label={
                  <Label text="Current Password" style={{ color: "#fff" }} />
                }
                name="current-password"
                rules={[
                  {
                    required: true,
                    message: "Please provide current-password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label={<Label text="New Password" style={{ color: "#fff" }} />}
                name="new-password"
                rules={[
                  { required: true, message: "Please provide new password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
