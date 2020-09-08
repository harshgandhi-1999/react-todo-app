import React from "react";
import { Toast } from "react-bootstrap";

const SignUpToast = ({ show, setShow, toastHeader, toastBody }) => {
  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      className="toast-style"
      style={{
        background: "#fff",
        maxWidth: "200px",
        margin: "10px auto",
      }}
    >
      <Toast.Header>
        <strong className="mr-auto">
          <b>{toastHeader}</b>
        </strong>
      </Toast.Header>
      <Toast.Body style={{ color: "#000", padding: "8px" }}>
        {toastBody}
      </Toast.Body>
    </Toast>
  );
};

export default SignUpToast;
