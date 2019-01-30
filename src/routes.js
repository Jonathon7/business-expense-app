import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Employee from "./pages/Employee/Employee";
import Submitted from "./pages/Admin/SubmittedReports/Submitted";
import Reports from "./pages/Admin/Reports/Reports";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/admin" component={Admin} />
    <Route path="/employee" component={Employee} />
    <Route path="/requests" component={Submitted} />
    <Route path="/reports" component={Reports} />
  </Switch>
);
