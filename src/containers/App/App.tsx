import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import * as css from './App.module.css';
import LoginPage from '../LoginPage/LoginPage';
import Header from '../../components/Header/Header';
import UrlService from '../../services/Url.service';
// import ProtectedRoute from '../../HOCs/ProtectedRoute';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isUserAuthorizedSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';

// @ts-ignore
const ParkingsPage = React.lazy(() => import('../ParkingsPage/ParkingsPage'));
// @ts-ignore
const BaseConfigPage = React.lazy(() => import('../BaseConfigPage/BaseConfigPage'));
const UserPage = React.lazy(() => import('../UserPage/UserPage'));


interface AppProps {
  isUserAuthorized: boolean,
}

export class App extends React.Component<AppProps> {
  render() {
    return (
      <main className={css['AppContainer']}>
        <Header/>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              path={UrlService.loginPageUrl}
              component={LoginPage}
            />
            <Route
              exact
              path="/config"
              component={BaseConfigPage}
            />
            <Route
              path={UrlService.parkingsPageUrl}
              component={ParkingsPage}
            />
            <Route
              path={UrlService.driverPageUrl}
              component={UserPage}
            />
            {/*<ProtectedRoute*/}
            {/*  path={UrlService.parkingsPageUrl}*/}
            {/*  component={ParkingsPage}*/}
            {/*  authorized={this.props.isUserAuthorized}*/}
            {/*  redirectPath={UrlService.loginPageUrl}*/}
            {/*/>*/}
            {/*<ProtectedRoute*/}
            {/*  path={UrlService.driverPageUrl}*/}
            {/*  component={UserPage}*/}
            {/*  authorized={this.props.isUserAuthorized}*/}
            {/*  redirectPath={UrlService.loginPageUrl}*/}
            {/*/>*/}
            <Redirect
              exact
              path="/"
              to={UrlService.loginPageUrl}
            />
          </Switch>
        </React.Suspense>
      </main>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, AppProps>({
  isUserAuthorized: isUserAuthorizedSelector,
});

export default connect(mapStateToProps)(App);
