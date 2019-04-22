import React from 'react';

import { UserAccountPageProps } from './UserSettingsPage';
import UserSettingsPersonalInfoAvatar from './UserSettingsPersonalInfoAvatar';
import UserSettingsPersonalInfoNameUsernameGender from './UserSettingsPersonalInfoNameUsernameGender';


export default function UserSettingsPersonalInfo(props: UserAccountPageProps) {
  return (
    <>
      <UserSettingsPersonalInfoAvatar {...props} />
      <UserSettingsPersonalInfoNameUsernameGender {...props} />
    </>
  );
}
