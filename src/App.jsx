import React from 'react';
import { Route, Router, Switch } from 'react-router';

import Map from './components/Map';
import BaseConfigPage from './containers/BaseConfigPage/BaseConfigPage';


function App(props) {
  return (
    <Router history={props.history}>
      <Switch>
        <Route
          path="/config"
          component={BaseConfigPage}
        />
        <Route
          path="/"
          component={Map}
        />
      </Switch>
    </Router>
  );
}

export default App;
