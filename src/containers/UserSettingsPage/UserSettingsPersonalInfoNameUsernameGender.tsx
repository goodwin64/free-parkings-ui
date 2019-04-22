import React from 'react';

import { UserAccountPageProps } from './UserSettingsPage';
import * as styled from './UserSettingsPersonalInfoNameUsernameGender.styled';
import Input from '../../components/TextFieldInput/Input';
import * as settingsStyled from './UserSettingsPage.styled';


function UserSettingsPersonalInfoNameUsernameGender(props: UserAccountPageProps) {
  const [username, setUsername] = React.useState(props.user.username);
  const [fullName, setFullName] = React.useState('');

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  return (
    <styled.Container>
      <settingsStyled.SettingsHeader>Your name</settingsStyled.SettingsHeader>
      <settingsStyled.SettingsDescription>How do you like people to call you</settingsStyled.SettingsDescription>
      <Input
        value={username}
        onChange={onUsernameChange}
        placeholder="Enter your username"
      />
      <Input
        value={fullName}
        onChange={onFullNameChange}
        placeholder="Enter your full name"
      />
    </styled.Container>
  )
}

export default UserSettingsPersonalInfoNameUsernameGender;
