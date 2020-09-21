import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/UserDashboardPage/Dashboard";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";
import NotFound from "./pages/NotFoundPage/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          {/* <Route path="/notfound" component={NotFound} exact /> */}
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
// #3c8cf0
export default App;
