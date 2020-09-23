import React from "react";
import { Button, Typography } from "antd";
import "./NotFound.css";
import WelcomeNavbar from "../../components/WelcomeNavbar";
import { Link } from "react-router-dom";

const { Title } = Typography;

const NotFound = () => {
  return (
    <>
      <WelcomeNavbar />
      <div className="page-not-found">
        <Title level={2} style={{ color: "#fff" }}>
          404 page not found !!
        </Title>
        <Link to="/">
          <Button type="primary">Go Back To Dashboard</Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
