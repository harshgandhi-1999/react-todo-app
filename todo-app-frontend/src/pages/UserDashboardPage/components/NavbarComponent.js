import React from "react";
import { Avatar, Dropdown, Menu, PageHeader } from "antd";

import { useAuth } from "../../../context/auth";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const menu = (logout, history) => {
  const handleClick = (e) => {
    if (e.key === "account") {
      console.log("account page");
    } else if (e.key === "settings") {
      history.push("/settings");
    } else if (e.key === "logout") {
      logout();
    }
  };

  return (
    <Menu onClick={handleClick}>
      <Menu.Item key="account">
        <UserOutlined />
        Account
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        Settings
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
};

const NavbarComponent = (props) => {
  const { username, logout } = useAuth();
  return (
    <PageHeader
      className="site-page-header"
      title={<div style={{ color: "#fff" }}>My Todos</div>}
      style={{ backgroundColor: "#3c8cf0", padding: "8px 16px" }}
      extra={[
        <Dropdown
          key="options"
          overlay={() => menu(logout, props.history)}
          trigger={["click"]}
        >
          <Avatar
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              cursor: "pointer",
              marginRight: 0,
            }}
          >
            <span>{username ? username[0].toUpperCase() : ""}</span>
          </Avatar>
        </Dropdown>,
      ]}
    />
  );
};

export default NavbarComponent;
