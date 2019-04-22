import React from 'react';

import { UserAccountPageProps } from './UserSettingsPage';
import * as styled from './UserSettingsPersonalInfo.styled';
import './UserSettingsPersonalInfo.global.css';
import UserSettingsPersonalInfoAvatar from './UserSettingsPersonalInfoAvatar';


export default function UserSettingsPersonalInfo(props: UserAccountPageProps) {
  const [username, setUsername] = React.useState(props.user.username);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <styled.Container>
      <UserSettingsPersonalInfoAvatar {...props} />
      <styled.InputContainer>
        <p>username:</p>
        <input type="text" value={username} onChange={onUsernameChange}/>
      </styled.InputContainer>
    </styled.Container>
  );
}
