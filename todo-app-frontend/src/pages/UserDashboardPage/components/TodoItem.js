import React from "react";
import { Button, List } from "antd";

const TodoItem = ({ item, handleDeleteTodo }) => {
  return (
    <List.Item
      key={item.id}
      actions={[
        item.completed === false ? (
          <Button
            type="default"
            style={{
              background: "transparent",
              color: "green",
              borderColor: "green",
            }}
          >
            Complete
          </Button>
        ) : (
          <Button
            type="default"
            style={{
              background: "transparent",
              color: "green",
              borderColor: "green",
            }}
            disabled
          >
            Done
          </Button>
        ),
        <Button
          danger
          style={{ background: "transparent" }}
          onClick={() => handleDeleteTodo(item.name, item.id, item.completed)}
        >
          Delete
        </Button>,
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
