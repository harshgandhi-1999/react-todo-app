import React from "react";
import NavbarComponent from "../UserDashboardPage/components/NavbarComponent";

const UserSettings = (props) => {
  return (
    <>
      <NavbarComponent history={props.history} />
      <div>this is settings page</div>
    </>
  );
};

export default UserSettings;
