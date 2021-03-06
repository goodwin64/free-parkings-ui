import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch } from 'react-router';
import { createStructuredSelector } from 'reselect';

import * as css from './App.module.css';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import UrlService from '../../services/Url.service';
import ProtectedRoute from '../../HOCs/ProtectedRoute';
import { isUserAuthorizedSelector, userInfoSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';
import { UserInfo } from '../../interfaces/UserInfo';
import { PageWrapper } from '../../components/CommonStyled/commonStyled';

const LoginPage = React.lazy(() => import('../LoginPage/LoginPage'));
const SignupPage = React.lazy(() => import('../SignupPage/SignupPage'));
const AllUsersPage = React.lazy(() => import('../AllUsersPage/AllUsersPage'));
const ParkingsPage = React.lazy(() => import('../ParkingsPage/ParkingsPage'));
const DashboardPage = React.lazy(() => import('../DashboardPage/DashboardPage'));
const UserSettingsPage = React.lazy(() => import('../UserSettingsPage/UserSettingsPage'));


interface AppProps {
  isUserAuthorized: boolean,
  userInfo: UserInfo,
}

export class App extends React.Component<AppProps> {
  render() {
    return (
      <main className={css['AppContainer']}>
        <Header/>
        <React.Suspense fallback={<PageWrapper><Loader/></PageWrapper>}>
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
              RedirectComponent={LoginPage}
            />
            <ProtectedRoute
              path={UrlService.parkingsPageUrl}
              component={ParkingsPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.parkingsPageRolesAllowed)}
              RedirectComponent={LoginPage}
            />
            <ProtectedRoute
              path={UrlService.dashboardPageUrl}
              component={DashboardPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.dashboardPageRolesAllowed)}
              RedirectComponent={LoginPage}
            />
            <ProtectedRoute
              path={UrlService.settingsPageUrl}
              component={UserSettingsPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.settingsPageRolesAllowed)}
              RedirectComponent={LoginPage}
            />
            <ProtectedRoute
              path={UrlService.allUsersPageUrl}
              component={AllUsersPage}
              allowed={UrlService.isRouteAllowed(this.props.userInfo, UrlService.allUsersPageRolesAllowed)}
              RedirectComponent={LoginPage}
            />
            <Redirect
              exact
              path="/"
              to={UrlService.detectPageByUserInfo(this.props.userInfo)}
            />
            <Redirect
              exact
              path={UrlService.rootUrl}
              to={UrlService.detectPageByUserInfo(this.props.userInfo)}
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
