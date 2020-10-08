import React from "react";
import { Dropdown, Menu, List } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const menu = (item, deleteTodo, completeTodo) => {
  const handleClick = (e) => {
    if (e.key === "1") {
      completeTodo(item.id);
    } else if (e.key === "2") {
      deleteTodo(item.name, item.id, item.completed);
    }
  };

  return (
    <Menu onClick={handleClick}>
      <Menu.Item key="1" disabled={item.completed}>
        Mark as Completed
      </Menu.Item>
      <Menu.Item key="2">Delete Todo</Menu.Item>
    </Menu>
  );
};
const TodoItem = ({ item, handleDeleteTodo, handleCompleteTodo }) => {
  return (
    <List.Item
      key={item.id}
      actions={[
        <Dropdown
          overlay={() => menu(item, handleDeleteTodo, handleCompleteTodo)}
          trigger={["click"]}
        >
          <MoreOutlined
            style={{ color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}
          />
        </Dropdown>,
      ]}
      style={{
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "20px",
        marginTop: "20px",
        padding: "20px 20px",
        boxShadow:
          "-3px 3px 0px rgba(0,255,255,0.8), 3px -3px 5px rgba(0,0,0,0.5)",
      }}
    >
      <List.Item.Meta
        title={
          <div style={{ color: "orange", overflowWrap: "anywhere" }}>
            {item.name.toUpperCase()}
          </div>
        }
        description={
          <div style={{ color: "darkgray", overflowWrap: "anywhere" }}>
            {item.description}
          </div>
        }
      />
    </List.Item>
  );
};

export default TodoItem;
