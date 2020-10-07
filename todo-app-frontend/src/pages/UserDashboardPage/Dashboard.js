import React from "react";
import NavbarComponent from "./components/NavbarComponent";
import MainContent from "./components/MainContent";

const Dashboard = (props) => {
  return (
    <>
      <NavbarComponent history={props.history} />
      <MainContent />
    </>
  );
};

export default Dashboard;
