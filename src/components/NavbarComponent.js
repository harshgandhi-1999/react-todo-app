import React from "react";
import { Navbar } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar
      sticky="top"
      variant="dark"
      style={{ backgroundColor: "#3c8cf0" }}
      expand="lg"
    >
      <Navbar.Brand>My Todos</Navbar.Brand>
    </Navbar>
  );
};

export default NavbarComponent;
