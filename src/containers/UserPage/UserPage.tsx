import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from '../../interfaces/UserInfo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { userInfoSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';


const UserPropType = PropTypes.shape({
  isAuthorized: PropTypes.bool,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.oneOf(['male', 'female']),
});

interface UserPageOwnProps {
  user: UserInfo,
}

class UserPage extends React.PureComponent<UserPageOwnProps> {
  static propTypes = {
    user: UserPropType,
  };

  render() {
    if (!this.props.user) {
      return null;
    }

    return (
      <div>
        Hi, {this.props.user.username}.
        <img src={this.props.user.avatarUrl} alt="User avatar"/>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, UserPageOwnProps>({
  user: userInfoSelector,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  // @ts-ignore
)(UserPage);
