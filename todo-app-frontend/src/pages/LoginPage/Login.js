import React from "react";
import WelcomeNavbar from "../../components/WelcomeNavbar";
import LoginFormComponent from "./components/LoginFormComponent";

const Login = ({ setIsLoggedIn }) => {
  return (
    <>
      <WelcomeNavbar />
      <LoginFormComponent setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};

export default Login;
