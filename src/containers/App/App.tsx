import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import * as css from './App.module.css';
import LoginPage from '../LoginPage/LoginPage';
import Header from '../../components/Header/Header';
import UrlService from '../../services/Url.service';

// @ts-ignore
const ParkingsPage = React.lazy(() => import('../ParkingsPage/ParkingsPage'));
// @ts-ignore
const BaseConfigPage = React.lazy(() => import('../BaseConfigPage/BaseConfigPage'));


interface AppProps {}

export class App extends React.Component<AppProps> {
  render() {
    return (
      <main className={css['AppContainer']}>
        <Header/>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              exact
              path="/config"
              // @ts-ignore
              component={BaseConfigPage}
            />
            <Route
              path={UrlService.parkingsPageUrl}
              // @ts-ignore
              component={ParkingsPage}
            />
            <Route
              path={UrlService.loginPageUrl}
              component={LoginPage}
            />
            <Redirect
              exact
              path="/"
              to="/parkings"
            />
          </Switch>
        </React.Suspense>
      </main>
    );
  }
}

export default App;
