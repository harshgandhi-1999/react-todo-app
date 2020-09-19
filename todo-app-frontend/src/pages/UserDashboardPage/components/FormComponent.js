import React from "react";
import { Form, Button, Input, Row, Col, Space } from "antd";
import Label from "../../../components/Label";

const FormComponent = ({ handleAddTodo }) => {
  const handleSubmit = (e) => {
    handleAddTodo({
      name: e.taskName,
      description: e.taskDescription,
    });
    console.log(e);
  };

  return (
    <Form layout="vertical" name="add-todo-form" onFinish={handleSubmit}>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={<Label text="Name" style={{ color: "#fff" }} />}
            name="taskName"
            rules={[{ required: true, message: "Please provide task name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            label={<Label text="Description" style={{ color: "#fff" }} />}
            name="taskDescription"
          >
            <Input placeholder="Enter description" />
          </Form.Item>
        </Col>
      </Row>
      <Button type="primary" htmlType="submit">
        ADD
      </Button>
    </Form>
  );
};

export default FormComponent;
