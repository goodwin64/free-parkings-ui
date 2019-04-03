import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import * as css from './App.module.css';
import LoginPage from '../LoginPage/LoginPage';
import Header from '../../components/Header/Header';
import ParkingsPage from '../ParkingsPage/ParkingsPage';
import BaseConfigPage from '../BaseConfigPage/BaseConfigPage';
import UrlService from '../../services/Url.service';


interface AppProps {}

export class App extends React.Component<AppProps> {
  render() {
    return (
      <main className={css['AppContainer']}>
        <Header/>
        <Switch>
          <Route
            exact
            path="/config"
            // @ts-ignore
            component={BaseConfigPage}
          />
          <Route
            // path="/parkings"
            path={UrlService.parkings}

            // @ts-ignore
            component={ParkingsPage}
          />
          <Route
            path="/login"
            component={LoginPage}
          />
          <Redirect
            exact
            path="/"
            to="/parkings"
          />
        </Switch>
      </main>
    );
  }
}

// export default compose(
//   withRouter,
// )(App);

export default App;
