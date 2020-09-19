import React from "react";
import { PageHeader } from "antd";

const NavbarComponent = () => {
  return (
    <PageHeader
      className="site-page-header"
      title={<div style={{ color: "#fff" }}>My Todos</div>}
      style={{ backgroundColor: "#3c8cf0", padding: "8px 16px" }}
    />
  );
};

export default NavbarComponent;
