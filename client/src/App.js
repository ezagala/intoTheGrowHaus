import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Search from "./pages/Search";
import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";

import GlobalStyles from '../src/styled/GlobalStyles'; 


const App = () => (
<Fragment>
  <GlobalStyles/ >
  <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Login} />
          <Route exact path="/Search" component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </div>
  </Router>
</Fragment>
);

export default App;
