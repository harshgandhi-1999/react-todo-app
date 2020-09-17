import React from "react";
import { Navbar } from "react-bootstrap";

const WelcomeNavbar = () => {
  return (
    <Navbar
      sticky="top"
      variant="dark"
      style={{ backgroundColor: "#3c8cf0" }}
      expand="lg"
    >
      <Navbar.Brand>Todo App</Navbar.Brand>
    </Navbar>
  );
};

export default WelcomeNavbar;
