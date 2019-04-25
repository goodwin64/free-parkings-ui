import React from 'react';

import { UserAccountPageProps } from './UserSettingsPage';
import * as styled from './UserSettingsPersonalInfoNameUsername.styled';
import Input from '../../components/TextFieldInput/Input';
import * as settingsStyled from './UserSettingsPage.styled';


function UserSettingsPersonalInfoNameUsername(props: UserAccountPageProps) {
  const [username, setUsername] = React.useState(props.user.username);
  const [fullname, setFullname] = React.useState(props.user.fullname);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onUsernameSave = () => {
    props.updateUsername(username);
  };

  const onFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };

  const onFullnameSave = () => {
    props.updateFullname(fullname);
  };

  return (
    <styled.Container>
      <settingsStyled.AllSettingsHeader>Your name</settingsStyled.AllSettingsHeader>
      <settingsStyled.AllSettingsDescription>How do you like people to call you</settingsStyled.AllSettingsDescription>

      <styled.SettingContainer>
        <Input
          value={username}
          onChange={onUsernameChange}
          placeholder="Enter your username"
        />
        <styled.SettingButton
          onClick={onUsernameSave}
          disabled={username === props.user.username}
        >
          Save
        </styled.SettingButton>
      </styled.SettingContainer>

      <styled.SettingContainer>
        <Input
          value={fullname}
          onChange={onFullnameChange}
          placeholder="Enter your full name"
        />
        <styled.SettingButton
          onClick={onFullnameSave}
          disabled={fullname === props.user.fullname}
        >
          Save
        </styled.SettingButton>
      </styled.SettingContainer>
    </styled.Container>
  )
}

export default UserSettingsPersonalInfoNameUsername;