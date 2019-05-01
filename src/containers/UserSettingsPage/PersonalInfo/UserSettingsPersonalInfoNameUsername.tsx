import React from 'react';

import { UserAccountPageProps } from '../UserSettingsPage';
import InputText from '../../../components/TextFieldInput/InputText';
import * as settingsStyled from '../UserSettingsPage.styled';
import { AllSettingsContainer, SettingButton, SettingContainer } from '../UserSettingsPage.styled';


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
    <AllSettingsContainer>
      <settingsStyled.AllSettingsHeader>Your name</settingsStyled.AllSettingsHeader>
      <settingsStyled.AllSettingsDescription>How do you like people to call you</settingsStyled.AllSettingsDescription>

      <SettingContainer>
        <InputText
          value={username}
          onChange={onUsernameChange}
          placeholder="Enter your username"
        />
        <SettingButton
          onClick={onUsernameSave}
          disabled={username === props.user.username}
        >
          Save
        </SettingButton>
      </SettingContainer>

      <SettingContainer>
        <InputText
          value={fullname}
          onChange={onFullnameChange}
          placeholder="Enter your full name"
        />
        <SettingButton
          onClick={onFullnameSave}
          disabled={fullname === props.user.fullname}
        >
          Save
        </SettingButton>
      </SettingContainer>
    </AllSettingsContainer>
  )
}

export default UserSettingsPersonalInfoNameUsername;
