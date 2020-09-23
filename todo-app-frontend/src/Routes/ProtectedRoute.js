import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      component={(props) => {
        return authToken ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
