import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/UserDashboardPage/Dashboard";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";
import NotFound from "./pages/NotFoundPage/NotFound";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { AuthContext } from "./context/auth";
import axiosInstance from "./utils/axiosInstance";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const setLocalStorage = (data) => {
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer " + data.token;
    localStorage.setItem("Token", data.token);
    localStorage.setItem("UserId", data.userId);
    setAuthToken(data.token);
    setAuthUser(data.userId);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const existingToken = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
    if (existingToken && userId) {
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + existingToken;
      if (!isLoggedIn) {
        setIsLoggedIn(true);
      }
      setAuthToken(existingToken);
      setAuthUser(userId);
    }
  }, [isLoggedIn]);

  // fetch username
  useEffect(() => {
    if (isLoggedIn && authToken && authUser && !username) {
      axiosInstance
        .get(`/user/${authUser}`)
        .then((res) => {
          setUsername(res.data.username);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
          } else {
            console.log(err.message);
          }
        });
    }
  }, [isLoggedIn, authToken, authUser, username]);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setAuthToken(null);
    setAuthUser(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        authToken,
        authUser,
        username,
        setLocalStorage: setLocalStorage,
        logout: logout,
      }}
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
