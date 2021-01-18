import React, { useRef } from "react";
import { Form, Button, Input, Row, Col } from "antd";
import Label from "../../../components/Label";

const FormComponent = ({ handleAddTodo, btnLoading }) => {
  const addTodoRef = useRef();
  const handleSubmit = (e) => {
    console.log(addTodoRef.current.value);
    handleAddTodo(
      {
        name: e.taskName,
        description: e.taskDescription,
      },
      //passing callback function to clear the fields
      function () {
        addTodoRef.current.setFieldsValue({
          taskName: "",
          taskDescription: "",
        });
      }
    );
  };

  return (
    <Form
      layout="vertical"
      name="add-todo-form"
      onFinish={handleSubmit}
      ref={addTodoRef}
    >
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
      <Button loading={btnLoading} type="primary" htmlType="submit">
        ADD
      </Button>
    </Form>
  );
};

export default FormComponent;
