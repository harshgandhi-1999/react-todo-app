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
import UserSettings from "./pages/settingsPage/UserSettings";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const setLocalStorage = (data) => {
    axiosInstance.defaults.headers.common["Authorization"] =
      "Bearer " + data.token;
    localStorage.setItem("Token", data.token);
    localStorage.setItem("UserId", data.userId);
    setIsLoggedIn(true);
    setAuthToken(data.token);
    setAuthUser(data.userId);
  };

  useEffect(() => {
    console.log("1st use effect");
    const existingToken = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
    if (existingToken !== null && userId !== null) {
      console.log("1st use effect success");
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + existingToken;
      setIsLoggedIn(true);
      setAuthToken(existingToken);
      setAuthUser(userId);
    }
  }, [isLoggedIn]);

  // fetch username
  useEffect(() => {
    console.log("2nd use effect");
    if (
      isLoggedIn &&
      authToken !== null &&
      authUser !== null &&
      username === ""
    ) {
      console.log("2nd use effect success");
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
    setUsername("");
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
            <ProtectedRoute exact path="/settings" component={UserSettings} />
            <Route
              exact
              path="/signup"
              component={() => (isLoggedIn ? <Redirect to="/" /> : <Signup />)}
            />
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
