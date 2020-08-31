import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import "./TodoListComponent.css";
import TodoItem from "./TodoItem";

const TodoListComponent = ({
  todos,
  handleComplete,
  handleItemToBeDeleted,
}) => {
  console.log(todos);
  return (
    <div className="todo-list-container">
      <Card style={{ backgroundColor: "transparent", border: "none" }}>
        <Card.Body>
          <Card.Title>Todo List</Card.Title>
          {todos.length === 0 ? (
            <div className="empty-container">No Todos</div>
          ) : (
            <ListGroup>
              {todos.map((item) => {
                return (
                  <TodoItem
                    item={item}
                    key={item.id}
                    handleComplete={handleComplete}
                    handleItemToBeDeleted={handleItemToBeDeleted}
                  />
                );
              })}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoListComponent;
