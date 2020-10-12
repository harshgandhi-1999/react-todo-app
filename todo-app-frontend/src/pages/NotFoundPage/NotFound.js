import React from "react";
import { Button, Typography } from "antd";
import "./NotFound.css";
import WelcomeNavbar from "../../components/WelcomeNavbar";
import { Link} from "react-router-dom";

const { Title } = Typography;

const NotFound = ({history}) => {

  const goToPreviousPage = ()=>{
    history.goBack();
  }

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
        <br/>
        <Button type="primary" onClick={goToPreviousPage}>Go Back</Button>
      </div>
    </>
  );
};

export default NotFound;
