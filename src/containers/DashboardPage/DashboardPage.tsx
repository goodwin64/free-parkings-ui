import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { RootReducer } from '../../store/rootReducer';
import { avatarUrlSelector, userInfoSelector, usernameSelector } from '../../store/userState/selectors';
import UrlService from '../../services/Url.service';
import ImagesService from '../../services/Images.service';
import * as styled from './DashboardPage.styled';
import * as commonStyled from '../../components/CommonStyled/commonStyled';
import { UserInfo } from '../../interfaces/UserInfo';
import { isCarInfoFullyFilledSelector } from '../../store/car/selectors';
import { USER_ROLE_ADMIN } from '../../store/userState/reducer';


interface DashboardPageOwnProps {
  username: string,
  avatarUrl: string,
  user: UserInfo,
  isCarInfoFullyFilled: boolean,
}

interface DashboardPageProps extends DashboardPageOwnProps {}

class DashboardPage extends React.PureComponent<DashboardPageProps> {
  static propTypes = {
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  };

  render() {
    return (
      <commonStyled.PageWrapper>
        <styled.LinksContainer>
          <styled.NavLinkWrapper>
            <Link to={UrlService.settingsPageUrl}>
              <img src={ImagesService.driverImages.myAccount} alt="my account"/>
              <h2>My account</h2>
            </Link>
          </styled.NavLinkWrapper>

          <styled.NavLinkWrapper
            disabled={!this.props.isCarInfoFullyFilled}
          >
            <Link to={UrlService.findParkingsPageUrl}>
              <img src={ImagesService.driverImages.findParkings} alt="find parkings"/>
              <h2>Find the parking</h2>
            </Link>
          </styled.NavLinkWrapper>

          <styled.NavLinkWrapper
            hidden={this.props.user.role !== USER_ROLE_ADMIN}
          >
            <Link to={UrlService.allUsersPageUrl}>
              <img src={ImagesService.driverImages.drivers} alt="drivers"/>
              <h2>Users</h2>
            </Link>
          </styled.NavLinkWrapper>
        </styled.LinksContainer>
      </commonStyled.PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, DashboardPageOwnProps>({
  username: usernameSelector,
  avatarUrl: avatarUrlSelector,
  user: userInfoSelector,
  isCarInfoFullyFilled: isCarInfoFullyFilledSelector,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(DashboardPage);
