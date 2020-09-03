import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, itemToBeDeleted, handleClose, handleDelete }) => {
  const handleDeleteItem = () => {
    handleDelete(itemToBeDeleted, true);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This task is not completed yet! Are you sure you want to delete this
        task?
      </Modal.Body>
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
