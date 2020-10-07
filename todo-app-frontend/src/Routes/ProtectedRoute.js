import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("Token");
  return (
    <Route
      {...rest}
      component={(props) => {
        return token !== null ? (
          <Component logout={rest.logout} {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default ProtectedRoute;
