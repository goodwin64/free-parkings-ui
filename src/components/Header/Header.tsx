import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { userInfoSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';
import * as styles from './Header.module.css';
import UrlService from '../../services/Url.service';
import { UserInfo } from '../../interfaces/UserInfo';
import { userSignOutAttempt, userSignOutAttemptActionCreator } from '../../store/userState/actions';
import ImagesService from '../../services/Images.service';


interface HeaderOwnProps {
  user: UserInfo,
}

interface HeaderDispatchProps {
  userSignOut: userSignOutAttemptActionCreator,
}

interface HeaderProps extends HeaderOwnProps, HeaderDispatchProps {}

interface HeaderLocalState {}

class Header extends React.PureComponent<HeaderProps, HeaderLocalState> {
  renderLogo() {
    return (
      <Link to={UrlService.detectPageByUserInfo(this.props.user)}>
        <h1 className={styles['HeaderLogo']}>
          F<span className={styles['HeaderLogoFull']}>ree</span>
          {' '}
          P<span className={styles['HeaderLogoFull']}>arkings</span>
        </h1>
      </Link>
    );
  }

  renderUserActionsDropdown() {
    return (
      <ul
        className={styles['HeaderUserActionsDropdownList']}
      >
        <li>
          <Link
            to={'#'}
            className={styles['HeaderUserActionsDropdownLink']}
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to={UrlService.configPageUrl}
            className={styles['HeaderUserActionsDropdownLink']}
          >
            Settings
          </Link>
        </li>

        <hr className={styles['HeaderUserActionsDropdownListDivider']} />

        <li
          className={styles['HeaderUserActionsDropdownItem']}
        >
          <Link
            to={UrlService.loginPageUrl}
            onClick={this.props.userSignOut}
            className={styles['HeaderUserActionsDropdownLink']}
          >
            Logout
          </Link>
        </li>
      </ul>
    );
  }

  renderUserPanel() {
    if (!this.props.user.isAuthorized) {
      return null;
    }

    return (
      <section className={styles['HeaderUserPanel']}>
        <img
          src={this.props.user.imageUrl || ImagesService.commonImages.defaultUserIcon}
          alt="Avatar"
          className={styles['HeaderUserPanelAvatar']}
        />
        {this.renderUserActionsDropdown()}
      </section>
    );
  }

  render() {
    return (
      <header className={styles['HeaderContainer']}>
        { this.renderLogo() }
        { this.renderUserPanel() }
      </header>
    )
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, HeaderOwnProps>({
  user: userInfoSelector,
});

const mapDispatchToProps = {
  userSignOut: userSignOutAttempt,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Header);
