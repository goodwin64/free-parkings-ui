import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import * as css from './App.module.css';
import LoginPage from '../LoginPage/LoginPage';
import Header from '../../components/Header/Header';
import UrlService from '../../services/Url.service';
import ProtectedRoute from '../../HOCs/ProtectedRoute';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isUserAuthorizedSelector, userInfoSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';
import { UserInfo } from '../../interfaces/UserInfo';

// @ts-ignore
const ParkingsPage = React.lazy(() => import('../ParkingsPage/ParkingsPage'));
// @ts-ignore
const BaseConfigPage = React.lazy(() => import('../BaseConfigPage/BaseConfigPage'));
const UserPage = React.lazy(() => import('../UserPage/UserPage'));


interface AppProps {
  isUserAuthorized: boolean,
  userInfo: UserInfo,
}

export class App extends React.Component<AppProps> {
  render() {
    return (
      <main className={css['AppContainer']}>
        <Header/>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <ProtectedRoute
              path={UrlService.loginPageUrl}
              component={LoginPage}
              allowed={!this.props.isUserAuthorized}
              redirectPath={UrlService.detectPageByUserInfo(this.props.userInfo)}
            />
            <Route
              exact
              path="/config"
              component={BaseConfigPage}
            />
            <ProtectedRoute
              path={UrlService.findParkingsPageUrl}
              component={ParkingsPage}
              allowed={this.props.isUserAuthorized}
              redirectPath={UrlService.loginPageUrl}
            />
            <ProtectedRoute
              path={UrlService.driverPageUrl}
              component={UserPage}
              allowed={this.props.isUserAuthorized}
              redirectPath={UrlService.loginPageUrl}
            />
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
  userInfo: userInfoSelector,
  isUserAuthorized: isUserAuthorizedSelector,
});

export default connect(mapStateToProps)(App);
