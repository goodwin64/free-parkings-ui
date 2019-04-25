import React from 'react';

import { UserAccountPageProps } from './UserSettingsPage';
import * as styled from './UserSettingsPersonalInfoNameUsername.styled';
import * as settingsStyled from './UserSettingsPage.styled';
import Dropdown from '../../components/Dropdown/Dropdown';
import { POSSIBLE_GENDER_LIST, USER_GENDER_NOT_APPLIED } from '../../store/userState/reducer';
import { countriesNames } from '../../utils/countries';


function UserSettingsPersonalInfoGenderCountry(props: UserAccountPageProps) {
  const [gender = USER_GENDER_NOT_APPLIED, setGender] = React.useState(props.user.gender);
  const [defaultCountry, setDefaultCountry] = React.useState(props.user.defaultCountry);

  const onGenderUpdate = (gender: string) => {
    // @ts-ignore
    setGender(gender);
    // @ts-ignore
    props.updateGender(gender);
  };

  const onDefaultCountryUpdate = (countryName: string) => {
    setDefaultCountry(countryName);
    props.updateDefaultCountry(countryName);
  };

  return (
    <styled.Container>
      <settingsStyled.AllSettingsHeader>General statistics</settingsStyled.AllSettingsHeader>
      <settingsStyled.AllSettingsDescription>Metrics to help us analyze your portrait</settingsStyled.AllSettingsDescription>

      <styled.SettingContainer>
        <settingsStyled.SettingDescription>Your gender</settingsStyled.SettingDescription>
        <Dropdown options={POSSIBLE_GENDER_LIST} onChange={onGenderUpdate} value={gender} />
      </styled.SettingContainer>

      <styled.SettingContainer>
        <settingsStyled.SettingDescription>Your default country</settingsStyled.SettingDescription>
        <Dropdown options={countriesNames} onChange={onDefaultCountryUpdate} value={defaultCountry} />
      </styled.SettingContainer>
    </styled.Container>
  )
}

export default UserSettingsPersonalInfoGenderCountry;
