import React from "react";
import { PageHeader } from "antd";

const WelcomeNavbar = () => {
  return (
    <PageHeader
      className="site-page-header"
      title={<div style={{ color: "#fff" }}>Todo App</div>}
      style={{ backgroundColor: "#3c8cf0", padding: "8px 16px" }}
    />
  );
};
export default WelcomeNavbar;
