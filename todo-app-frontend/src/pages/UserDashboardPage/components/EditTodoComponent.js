import React, { useEffect, useRef,useState } from 'react';
import { Modal, Input, Form } from "antd";

const EditTodoComponent = ({ item, visible, setVisible }) => {
  const editFormRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  console.log(item.name,item.description);

  const handleOk = () => {
    const data = editFormRef.current.getFieldsValue();
    console.log(data);
    setVisible(false);
  }

  const setFormValues = () => {
    if (editFormRef.current !== null) {
      editFormRef.current.setFieldsValue({
        taskName: name,
        taskDescription: description,
      })
    }
  }

  useEffect(() => {
      setFormValues();
      setName(item.name);
      setDescription(item.description);
      console.log("value set");
      console.log(editFormRef.current);
  }, []);

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
          <Input placeholder="Enter name"/>
        </Form.Item>
        <Form.Item
          label="Description"
          name="taskDescription"
        >
          <Input placeholder="Enter description"/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditTodoComponent