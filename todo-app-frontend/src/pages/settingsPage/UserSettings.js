import React, { useState } from "react";
import { Divider, Spin, Typography } from "antd";
import NavbarComponent from "../../components/NavbarComponent"
import AccountSettings from "./components/AccountSettings";
import ResetPassword from "./components/ResetPassword";
import DeleteAccount from "./components/DeleteAccount";
import "./settings.css";

const { Title } = Typography;

const UserSettings = (props) => {
  const [pageLoading, setPageLoading] = useState(false);

  return (
    <>
      <Spin size="large" spinning={pageLoading}>
        <NavbarComponent history={props.history} />
        <div className="settings-container">
          <div className="settings-page-heading">
            <Title level={4} style={{ color: "#fff", marginBottom: "0" }}>
              Settings
            </Title>
          </div>
          <AccountSettings setPageLoading={setPageLoading} />
          <Divider style={{ borderColor: "#fff" }} />
          <ResetPassword setPageLoading={setPageLoading}/>
          <Divider style={{ borderColor: "#fff" }} />
          <DeleteAccount/>
        </div>
      </Spin>
    </>
  );
};

export default UserSettings;
