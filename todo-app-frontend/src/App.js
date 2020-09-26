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
  const [username, setUsername] = useState("");

  const setLocalStorage = (data) => {
    localStorage.setItem("Token", data.token);
    localStorage.setItem("UserId", data.userId);
    localStorage.setItem("RefreshToken", data.refreshToken);
    setAuthToken(data.token);
    setAuthUser(data.userId);
  };

  useEffect(() => {
    const existingToken = localStorage.getItem("Token");
    const userId = localStorage.getItem("UserId");
    if (existingToken && userId) {
      setIsLoggedIn(true);
      setAuthToken(existingToken);
      setAuthUser(userId);
      axiosInstance
        .get(`/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${existingToken}`,
          },
        })
        .then((res) => {
          setUsername(res.data.username);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
