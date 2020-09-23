import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/UserDashboardPage/Dashboard";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";
import NotFound from "./pages/NotFoundPage/NotFound";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { AuthContext } from "./context/auth";

function App() {
  const existingToken = localStorage.getItem("Token");
  const userId = localStorage.getItem("UserId");
  const [authToken, setAuthToken] = useState(existingToken);
  const [authUser, setAuthUser] = useState(userId);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setLocalStorage = (data) => {
    localStorage.setItem("Token", data.token);
    localStorage.setItem("UserId", data.userId);
    setAuthToken(data.token);
    setAuthUser(data.userId);
  };

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authToken]);
  return (
    <AuthContext.Provider
      value={{ authToken, authUser, setLocalStorage: setLocalStorage }}
    >
      <div className="App">
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Dashboard} />
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/login"
              component={() =>
                isLoggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Login setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}
// #3c8cf0
export default App;
