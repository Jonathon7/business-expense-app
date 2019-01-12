import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Employee from "./pages/Employee/Employee";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/admin" component={Admin} />
    <Route path="/employee" component={Employee} />
  </Switch>
);
