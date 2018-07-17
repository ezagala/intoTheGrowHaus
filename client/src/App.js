import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav/>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Home" component={Login} />
        <Route exact path="/Search" component={Search} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
