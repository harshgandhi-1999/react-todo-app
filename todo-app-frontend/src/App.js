import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/UserDashboardPage/Dashboard";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Dashboard} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
// #3c8cf0
export default App;
