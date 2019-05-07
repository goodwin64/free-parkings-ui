import React from 'react';

import { UserInfo } from '../../interfaces/UserInfo';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import { USER_ROLE_ADMIN, USER_ROLE_DRIVER } from '../../store/userState/reducer';
import { setUserRoleAttemptActionCreator } from '../../store/allUsers/actions';


interface UserRowProps extends UserInfo {
  setUserRole: setUserRoleAttemptActionCreator,
}

export default function UserRow(props: UserRowProps) {
  const onUserRoleChange = (isAdmin: boolean) => props.setUserRole(props.id, isAdmin ? USER_ROLE_ADMIN : USER_ROLE_DRIVER);

  return (
    <tr>
      <td>{props.id}</td>
      <td><img width={50} src={props.avatarUrl} alt={`user ${props.id} avatar`}/></td>
      <td>{props.username}</td>
      <td>{props.fullname}</td>
      <td>{props.gender}</td>
      <td>{props.defaultCountry}</td>
      <td>
        <ToggleSwitch
          value1="driver"
          value2="admin"
          onChange={onUserRoleChange}
          isOnByDefault={props.role === USER_ROLE_ADMIN}
        />
      </td>
    </tr>
  );
}
