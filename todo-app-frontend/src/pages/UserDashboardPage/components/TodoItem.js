import React from "react";
// import { Row, Col, Button, ListGroup } from "react-bootstrap";

const TodoItem = ({ item, handleComplete, handleItemToBeDeleted }) => {
  const todoCompleted = (item) => {
    handleComplete(item);
  };

  const deleteTodo = (item) => {
    handleItemToBeDeleted(item);
  };

  return (
    <div></div>
    // <ListGroup.Item
    //   style={{
    //     backgroundColor: "transparent",
    //     border: "none",
    //     borderRadius: "20px",
    //     marginBottom: "40px",
    //     boxShadow:
    //       "-3px 3px 0px rgba(0,255,255,0.8), 3px -3px 5px rgba(0,0,0,0.5)",
    //   }}
    // >
    //   <Row className="row-style">
    //     <Col xs={12} sm={6} md={8}>
    //       <div className="todo-item-name">
    //         <h5 style={{ color: "orange" }}>{item.name.toUpperCase()}</h5>
    //       </div>
    //       <div className="todo-item-description" style={{ color: "darkgray" }}>
    //         {item.description}
    //       </div>
    //     </Col>
    //     <Col xs={12} sm={6} md={4} className="buttons-style">
    //       {item.completed === false ? (
    //         <Button
    //           variant="outline-primary"
    //           style={{ marginRight: "10px" }}
    //           onClick={() => todoCompleted(item)}
    //         >
    //           Complete
    //         </Button>
    //       ) : (
    //         <Button
    //           variant="outline-success"
    //           style={{ marginRight: "10px" }}
    //           disabled
    //         >
    //           Done
    //         </Button>
    //       )}

    //       <Button variant="outline-danger" onClick={() => deleteTodo(item)}>
    //         Delete
    //       </Button>
    //     </Col>
    //   </Row>
    // </ListGroup.Item>
  );
};

export default TodoItem;
