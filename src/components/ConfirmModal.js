import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, itemToBeDeleted, handleClose, handleDelete }) => {
  const handleDeleteItem = () => {
    handleDelete(itemToBeDeleted, true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          NO
        </Button>
        <Button variant="primary" onClick={handleDeleteItem}>
          YES
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
