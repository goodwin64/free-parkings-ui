import React from 'react';

import { UserAccountPageProps } from './UserSettingsPage';
import UserSettingsPersonalInfoAvatar from './UserSettingsPersonalInfoAvatar';
import UserSettingsPersonalInfoNameUsername from './UserSettingsPersonalInfoNameUsername';
import UserSettingsPersonalInfoGenderCountry from './UserSettingsPersonalInfoGenderCountry';


export default function UserSettingsPersonalInfo(props: UserAccountPageProps) {
  return (
    <>
      <UserSettingsPersonalInfoNameUsername {...props} />
      <UserSettingsPersonalInfoGenderCountry {...props} />
      <UserSettingsPersonalInfoAvatar {...props} />
    </>
  );
}
