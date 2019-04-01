import React from 'react';
import PropTypes from 'prop-types';

import { User } from '../../interfaces/User';


const UserPropType = PropTypes.shape({
  isAuthorized: PropTypes.bool,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.oneOf(['male', 'female']),
});

interface UserPageProps {
  user: User,
}

class UserPage extends React.PureComponent<UserPageProps> {
  static propTypes = {
    user: UserPropType,
  };

  render() {
    return (
      <div>
        Hi, {this.props.user.name}.
        <img src={this.props.user.avatarUrl} alt="User avatar"/>
      </div>
    );
  }
}

export default UserPage;
