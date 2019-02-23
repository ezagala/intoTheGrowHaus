import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from './components/Login';
import MasterMap from './components/Map';
import Search from './pages/Search';
import NoMatch from './pages/NoMatch';

import GlobalStyles from './styled/GlobalStyles';


const App = () => (
<Fragment>
  <GlobalStyles /> 
  <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Login} />
          <Route exact path="/map" component={MasterMap} />
          <Route exact path="/search" component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </div>
  </Router>
</Fragment>
);

export default App;
