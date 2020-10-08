import React from "react";
import { Form, Button, Input, Row, Col, Typography } from "antd";
import Label from "../../../components/Label";

const { Title } = Typography;

const AccountSettings = () => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Title className="account-title" level={4} style={{ color: "#fff" }}>
        Account
      </Title>
      <div className="account-container">
        <Form layout="vertical" name="update-account-info">
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
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettings;
