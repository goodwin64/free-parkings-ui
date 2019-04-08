import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from '../../interfaces/UserInfo';


const UserPropType = PropTypes.shape({
  isAuthorized: PropTypes.bool,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.oneOf(['male', 'female']),
});

interface UserPageProps {
  user?: UserInfo,
}

class UserPage extends React.PureComponent<UserPageProps> {
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

export default UserPage;
