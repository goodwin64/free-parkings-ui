import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { userStateSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';
import * as styles from './Header.module.css';
import UrlService from '../../services/Url.service';
import { UserState } from '../../store/userState/reducer';
import { userSignOut, userSignOutActionCreator } from '../../store/userState/actions';


interface HeaderOwnProps {
  user: UserState,
}

interface HeaderDispatchProps {
  userSignOut: userSignOutActionCreator,
}

interface HeaderProps extends HeaderOwnProps, HeaderDispatchProps {}

interface HeaderLocalState {}

class Header extends React.PureComponent<HeaderProps, HeaderLocalState> {
  static renderLogo() {
    return (
      <h1 className={styles['HeaderLogo']}>
        F<span className={styles['HeaderLogoFull']}>ree</span>
        {' '}
        P<span className={styles['HeaderLogoFull']}>arkings</span>
      </h1>
    );
  }

  renderUserPanel() {
    if (!this.props.user.userAuthInfo.isAuthorized) {
      return null;
    }

    return (
      <section className={styles['HeaderUserPanel']}>
        <Link
          to="/user-dashboard"
        >
          {this.props.user.userPersonalInfo.username}
        </Link>
        <Link
          to={UrlService.loginPageUrl}
          onClick={this.props.userSignOut}
        >
          Logout
        </Link>
        {
          this.props.user.userPersonalInfo.avatarUrl && (
            <img
              src={this.props.user.userPersonalInfo.avatarUrl}
              alt="Avatar"
              className={styles['HeaderUserPanelAvatar']}
            />
          )
        }
      </section>
    );
  }

  render() {
    return (
      <header className={styles['HeaderContainer']}>
        { Header.renderLogo() }
        { this.renderUserPanel() }
      </header>
    )
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, HeaderOwnProps>({
  user: userStateSelector,
});

const mapDispatchToProps = {
  userSignOut,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Header);
