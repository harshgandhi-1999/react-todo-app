import { Divider, Typography } from "antd";
import React from "react";
import NavbarComponent from "../UserDashboardPage/components/NavbarComponent";
import AccountSettings from "./components/AccountSettings";
import ResetPassword from "./components/ResetPassword";
import "./settings.css";

const { Title } = Typography;

const UserSettings = (props) => {
  return (
    <>
      <NavbarComponent history={props.history} />
      <div className="settings-container">
        <div className="settings-page-heading">
          <Title level={4} style={{ color: "#fff", marginBottom: "0" }}>
            Settings
          </Title>
        </div>
        <AccountSettings />
        <Divider style={{ borderColor: "#fff" }} />
        <ResetPassword />
      </div>
    </>
  );
};

export default UserSettings;
