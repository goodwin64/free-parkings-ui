import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RootReducer } from '../../store/rootReducer';
import { avatarUrlSelector, usernameSelector } from '../../store/userState/selectors';
import { Link } from 'react-router-dom';
import UrlService from '../../services/Url.service';
import ImagesService from '../../services/Images.service';
import * as styled from './UserPage.styled';


interface UserPageOwnProps {
  username: string,
  avatarUrl: string,
}

interface UserPageProps extends UserPageOwnProps {}

class DriverPage extends React.PureComponent<UserPageProps> {
  static propTypes = {
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  };

  render() {
    return (
      <styled.Wrapper>
        <styled.LinksContainer>
          <styled.NavLinkWrapper>
            <Link to={UrlService.driverAccountPageUrl}>
              <img src={ImagesService.driverImages.myAccount} alt="my account"/>
              <h2>My account</h2>
            </Link>
          </styled.NavLinkWrapper>

          <styled.NavLinkWrapper>
            <Link to={UrlService.findParkingsPageUrl}>
              <img src={ImagesService.driverImages.findParkings} alt="find parkings"/>
              <h2>Find the parking</h2>
            </Link>
          </styled.NavLinkWrapper>

          <styled.NavLinkWrapper>
            <Link to={UrlService.myDrivesPageUrl}>
              <img src={ImagesService.driverImages.myDrives} alt="my drives"/>
              <h2>Drives</h2>
            </Link>
          </styled.NavLinkWrapper>
        </styled.LinksContainer>
      </styled.Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, UserPageOwnProps>({
  username: usernameSelector,
  avatarUrl: avatarUrlSelector,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(DriverPage);
