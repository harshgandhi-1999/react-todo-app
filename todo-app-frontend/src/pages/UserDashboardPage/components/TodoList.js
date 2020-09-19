import React from "react";
import { Button, List } from "antd";

const TodoItem = ({ item, handleComplete, handleItemToBeDeleted }) => {
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
            onClick={() => handleComplete(item)}
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
          onClick={() => handleItemToBeDeleted(item)}
        >
          Delete
        </Button>,
      ]}
      style={{
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "20px",
        marginBottom: "20px",
        padding: "20px 20px",
        boxShadow:
          "-3px 3px 0px rgba(0,255,255,0.8), 3px -3px 5px rgba(0,0,0,0.5)",
      }}
    >
      <List.Item.Meta
        title={
          <span style={{ color: "orange" }}>{item.name.toUpperCase()}</span>
        }
        description={
          <span style={{ color: "darkgray" }}>{item.description}</span>
        }
      />
    </List.Item>
  );
};

const TodoList = ({ todos, handleComplete, handleItemToBeDeleted }) => {
  return (
    <List
      dataSource={todos}
      renderItem={(item) => {
        return (
          <TodoItem
            item={item}
            handleComplete={handleComplete}
            handleItemToBeDeleted={handleItemToBeDeleted}
          />
        );
      }}
    />
  );
};

export default TodoList;
