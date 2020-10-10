import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, PageHeader } from "antd";
import { useAuth } from "../context/auth";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

const menu = (logout, history) => {
  const handleClick = (e) => {
    if (e.key === "settings") {
      history.push("/settings");
    } else if (e.key === "logout") {
      logout();
    }
  };

  return (
    <Menu theme="dark" onClick={handleClick}>
      <Menu.Item key="settings">
        <SettingOutlined />
        <span style={{ fontSize: "1rem" }}>Settings</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span style={{ fontSize: "1rem" }}>Logout</span>
      </Menu.Item>
    </Menu>
  );
};

const NavbarComponent = (props) => {
  const { username, logout } = useAuth();
  return (
    <PageHeader
      className="site-page-header"
      title={
        <div style={{ color: "#fff", cursor: "pointer" }}>
          <Link to="/" style={{ color: "#fff" }}>
            My Todos
          </Link>
        </div>
      }
      style={{ backgroundColor: "#3c8cf0", padding: "8px 16px" }}
      extra={[
        <Dropdown
          key="options"
          overlay={() => menu(logout, props.history)}
          trigger={["click"]}
        >
          <span style={{ fontSize: "1rem", cursor: "pointer", color: "#fff" }}>
            <UserOutlined />
            {"  "}
            {username.length > 0 ? username : ""}
            {"  "}
            <DownOutlined />
          </span>
        </Dropdown>,
      ]}
    />
  );
};

export default NavbarComponent;
