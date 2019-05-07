import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import UserRow from './UserRow';
import { RootReducer } from '../../store/rootReducer';
import * as actions from '../../store/allUsers/actions';
import * as selectors from '../../store/allUsers/selectors';
import { AllUsersPageOwnProps } from '../../store/allUsers/reducer';
import { loadAllUsersAttempt, setUserRoleAttempt } from '../../store/allUsers/actions';
import * as styled from './AllUsersPage.styled';


interface AllUsersPageDispatchProps {
  loadAllUsersAttempt: actions.loadAllUsersAttemptActionCreator,
  setUserRole: actions.setUserRoleAttemptActionCreator,
}

interface AllUsersPageProps extends AllUsersPageOwnProps,
  AllUsersPageDispatchProps {
}

function AllUsersPage(props: AllUsersPageProps) {
  React.useEffect(() => {
    props.loadAllUsersAttempt();
  }, []);

  return (
    <styled.Container>
      <h1>all users</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>avatarUrl</th>
            <th>username</th>
            <th>fullname</th>
            <th>gender</th>
            <th>defaultCountry</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
        {
          props.users.map(user => (
            <UserRow
              key={user.id}
              {...user}
              setUserRole={props.setUserRole}
            />
          ))
        }
        </tbody>
      </table>
    </styled.Container>
  );
}

const mapStateToProps = createStructuredSelector<RootReducer, AllUsersPageOwnProps>({
  users: selectors.allUsersSelector,
  isInProgress: selectors.allUsersPageIsInProgressSelector,
});

const mapDispatchToProps: AllUsersPageDispatchProps = {
  loadAllUsersAttempt,
  setUserRole: setUserRoleAttempt,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(AllUsersPage);
