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
import {
  updateAvatar,
  updateAvatarActionCreator,
  updateDefaultCountry,
  updateDefaultCountryActionCreator,
  updateFullname,
  updateFullnameActionCreator,
  updateGender,
  updateGenderActionCreator,
  updateUsername,
  updateUsernameActionCreator,
} from '../../store/userState/actions';
import * as styled from './UserSettingsPage.styled';


interface UserAccountPageOwnProps {
  user: UserInfo,
}

interface UserAccountPageDispatchProps {
  updateAvatar: updateAvatarActionCreator,
  updateUsername: updateUsernameActionCreator,
  updateFullname: updateFullnameActionCreator,
  updateGender: updateGenderActionCreator,
  updateDefaultCountry: updateDefaultCountryActionCreator,
}

export interface UserAccountPageProps extends UserAccountPageOwnProps, UserAccountPageDispatchProps {}

interface UserAccountPageState {
  selectedTabIndex: number,
}

class UserSettingsPage extends React.PureComponent<UserAccountPageProps, UserAccountPageState> {
  static propTypes = {
    // TODO: issue with shape(*) proptypes
    user: PropTypes.shape({
      role: PropTypes.oneOf([USER_ROLE_DRIVER, USER_ROLE_ADMIN]).isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    updateAvatar: PropTypes.func.isRequired,
    updateUsername: PropTypes.func.isRequired,
    updateFullname: PropTypes.func.isRequired,
    updateGender: PropTypes.func.isRequired,
    updateDefaultCountry: PropTypes.func.isRequired,
  };

  constructor(props: UserAccountPageProps) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    };
  }

  renderPersonalInfo() {
    return (
      <UserSettingsPersonalInfo {...this.props}/>
    );
  }

  private renderTabHeaders() {
    return (
      <div>
        <styled.TabHeader
          active={this.state.selectedTabIndex === 0}
          onClick={() => this.setState({ selectedTabIndex: 0 })}
        >
          Personal info
        </styled.TabHeader>
        <styled.TabHeader
          active={this.state.selectedTabIndex === 1}
          onClick={() => this.setState({ selectedTabIndex: 1 })}
        >
          Car parameters
        </styled.TabHeader>
        <styled.TabHeader
          active={this.state.selectedTabIndex === 2}
          onClick={() => this.setState({ selectedTabIndex: 2 })}
        >
          Parkings preferences
        </styled.TabHeader>
        {
          this.props.user.role === USER_ROLE_ADMIN && (
            <styled.TabHeader
              active={this.state.selectedTabIndex === 3}
              onClick={() => this.setState({ selectedTabIndex: 3 })}
            >
              Admin settings
            </styled.TabHeader>
          )
        }
      </div>
    )
  }

  private renderSelectedTabBody() {
    switch (this.state.selectedTabIndex) {
      case 0: {
        return this.renderPersonalInfo();
      }
      case 1: {
        return this.renderCarInfo();
      }
      default: {
        return null;
      }
    }
  }

  private renderCarInfo() {
    return <div>car info</div>;
  }

  render() {
    return (
      <commonStyled.PageWrapper>
        <commonStyled.Tile>
          <commonStyled.TileHeader>
            {this.renderTabHeaders()}
          </commonStyled.TileHeader>
          <commonStyled.TileBody>
            {this.renderSelectedTabBody()}
          </commonStyled.TileBody>
        </commonStyled.Tile>
      </commonStyled.PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, UserAccountPageOwnProps>({
  user: userInfoSelector,
});

const mapDispatchToProps = {
  updateAvatar,
  updateUsername,
  updateFullname,
  updateGender,
  updateDefaultCountry,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  // @ts-ignore
)(UserSettingsPage);
