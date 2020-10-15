import React, { useCallback, useRef } from "react";
import { Modal, Input, Form } from "antd";

const EditTodoComponent = ({ item, visible, setVisible, handleUpdateTodo }) => {
  const temp = useRef();

  const handleOk = () => {
    const updatedTodo = temp.current.getFieldsValue();

    if (updatedTodo.taskName.length > 0) {
      const body = {
        name: updatedTodo.taskName,
        description: updatedTodo.taskDescription,
      };
      handleUpdateTodo(body, item.id);
      setVisible(false);
    }
  };

  const editFormRef = useCallback(
    (node) => {
      // console.log(node);
      if (node !== null) {
        node.setFieldsValue({
          taskName: item.name,
          taskDescription: item.description,
        });
        temp.current = node;
      }
    },
    [visible, item.name, item.description]
  );

  return (
    <Modal
      title="Edit"
      visible={visible}
      onOk={handleOk}
      okText="Update"
      onCancel={() => setVisible(false)}
    >
      <Form layout="vertical" name="edit-todo-form" ref={editFormRef}>
        <Form.Item
          label="Name"
          name="taskName"
          rules={[{ required: true, message: "Please provide task name!" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item label="Description" name="taskDescription">
          <Input placeholder="Enter description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTodoComponent;
