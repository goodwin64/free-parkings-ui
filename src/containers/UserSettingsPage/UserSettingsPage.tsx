import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { USER_ROLE_ADMIN, USER_ROLE_DRIVER } from '../../store/userState/reducer';
import * as commonStyled from '../../components/CommonStyled/commonStyled';
import { RootReducer } from '../../store/rootReducer';
import { UserInfo } from '../../interfaces/UserInfo';
import { userInfoSelector } from '../../store/userState/selectors';
import UserSettingsPersonalInfo from './UserSettingsPersonalInfo';
import { updateAvatar, updateAvatarActionCreator } from '../../store/userState/actions';


interface UserAccountPageOwnProps {
  user: UserInfo,
}

interface UserAccountPageDispatchProps {
  updateAvatar: updateAvatarActionCreator,
}

export interface UserAccountPageProps extends UserAccountPageOwnProps, UserAccountPageDispatchProps {}

interface UserAccountPageState {
  avatarUrl: string,
}

class UserSettingsPage extends React.PureComponent<UserAccountPageProps, UserAccountPageState> {
  static propTypes = {
    // TODO: issue with shape(*) proptypes
    user: PropTypes.shape({
      role: PropTypes.oneOf([USER_ROLE_DRIVER, USER_ROLE_ADMIN]).isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    updateAvatar: PropTypes.func.isRequired,
  };

  constructor(props: UserAccountPageProps) {
    super(props);
    this.state = {
      avatarUrl: props.user.avatarUrl,
    };
  }


  renderPersonalInfo() {
    return (
      <UserSettingsPersonalInfo {...this.props}/>
    );
  }

  renderCarInfo() {
    return (
      <h2>Car parameters</h2>
    );
  }

  renderParkingsPreferences() {
    return (
      <h2>Parkings preferences</h2>
    );
  }

  renderAdminSettings() {
    return (
      <h2>Admin settings</h2>
    );
  }

  render() {
    return (
      <commonStyled.PageWrapper>
        <commonStyled.Tile>
          <commonStyled.TileHeader>
            <h2>Personal info</h2>
          </commonStyled.TileHeader>
          <commonStyled.TileBody>
            {this.renderPersonalInfo()}
            {this.renderCarInfo()}
            {this.renderParkingsPreferences()}
            {this.props.user.role === USER_ROLE_ADMIN && this.renderAdminSettings()}
          </commonStyled.TileBody>
        </commonStyled.Tile>
        <img src="https://cdn.dribbble.com/users/1183973/screenshots/3305551/dribbble.jpg" alt=""/>
      </commonStyled.PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, UserAccountPageOwnProps>({
  user: userInfoSelector,
});

const mapDispatchToProps = {
  updateAvatar,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  // @ts-ignore
)(UserSettingsPage);
