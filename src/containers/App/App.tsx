import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import * as css from './App.module.css';
import Header from '../../components/Header/Header';
import UrlService from '../../services/Url.service';
import ProtectedRoute from '../../HOCs/ProtectedRoute';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isUserAuthorizedSelector, userInfoSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';
import { UserInfo } from '../../interfaces/UserInfo';

const LoginPage = React.lazy(() => import('../LoginPage/LoginPage'));
const SignupPage = React.lazy(() => import('../SignupPage/SignupPage'));
// @ts-ignore
const ParkingsPage = React.lazy(() => import('../ParkingsPage/ParkingsPage'));
// @ts-ignore
const BaseConfigPage = React.lazy(() => import('../BaseConfigPage/BaseConfigPage'));
const DashboardPage = React.lazy(() => import('../DashboardPage/DashboardPage'));
const AdminAccountPage = React.lazy(() => import('../AdminAccountPage/AdminAccountPage'));
const DriverAccountPage = React.lazy(() => import('../DriverAccountPage/DriverAccountPage'));


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
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.loginPageRolesAllowed)}
              redirectPath={UrlService.detectPageByUserInfo(this.props.userInfo)}
            />
            <ProtectedRoute
              path={UrlService.signupPageUrl}
              component={SignupPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.signupPageRolesAllowed)}
              redirectPath={UrlService.detectPageByUserInfo(this.props.userInfo)}
            />
            <Route
              exact
              path={UrlService.configPageUrl}
              component={BaseConfigPage}
            />
            <ProtectedRoute
              path={UrlService.findParkingsPageUrl}
              component={ParkingsPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.findParkingsPageRolesAllowed)}
              redirectPath={UrlService.loginPageUrl}
            />
            <ProtectedRoute
              path={UrlService.dashboardPageUrl}
              component={DashboardPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.dashboardPageRolesAllowed)}
              redirectPath={UrlService.loginPageUrl}
            />
            <ProtectedRoute
              path={UrlService.driverAccountPageUrl}
              component={DriverAccountPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.driverAccountPageRolesAllowed)}
              redirectPath={UrlService.loginPageUrl}
            />
            <ProtectedRoute
              path={UrlService.adminAccountPageUrl}
              component={AdminAccountPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.adminAccountPageRolesAllowed)}
              redirectPath={UrlService.loginPageUrl}
            />
            <ProtectedRoute
              path={UrlService.myDrivesPageUrl}
              component={() => <div>my drives</div>}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.myDrivesPageRolesAllowed)}
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
