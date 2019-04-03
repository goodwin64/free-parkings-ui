import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { userSelector } from '../../containers/UserPage/selectors';
import { RootReducer } from '../../store/rootReducer';
import { User } from '../../interfaces/User';
import * as styles from './Header.module.css';


interface HeaderOwnProps {
  user: User,
}
interface HeaderState {}

class Header extends React.PureComponent<HeaderOwnProps, HeaderState> {
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
    return (
      <section className={styles['HeaderUserPanel']}>
        {
          this.props.user.isAuthorized && (
            <Link
              to="/user-dashboard"
            >
              {this.props.user.name}
            </Link>
          )
        }
        {
          this.props.user.isAuthorized && (
            <Link
              to="/login"
            >
              Logout
            </Link>
          )
        }
        {
          this.props.user.avatarUrl && (
            <img
              src={this.props.user.avatarUrl}
              alt=""
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
  user: userSelector,
});

const mapDispatchToProps = {};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Header);
