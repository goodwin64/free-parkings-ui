import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RootReducer } from '../../../store/rootReducer';
import * as settingsStyled from '../UserSettingsPage.styled';
import ToggleSwitch from '../../../components/ToggleSwitch/ToggleSwitch';
import {
  areVoiceNotificationsEnabledSelector,
  isParkingAutoSearchEnabledSelector,
} from '../../../store/parkingSettings/selectors';
import { UserSettingsParkingPreferencesOwnProps } from '../../../store/parkingSettings/reducer';
import {
  setCheckingParkopediaUpdates,
  setCheckingParkopediaUpdatesActionCreator,
  setVoiceNotifications,
  setVoiceNotificationsActionCreator,
} from '../../../store/parkingSettings/actions';


interface UserSettingsParkingPreferencesDispatchProps {
  setVoiceNotifications: setVoiceNotificationsActionCreator,
  setCheckingParkopediaUpdates: setCheckingParkopediaUpdatesActionCreator,
}

interface UserSettingsParkingPreferencesProps extends
  UserSettingsParkingPreferencesOwnProps,
  UserSettingsParkingPreferencesDispatchProps {}

function UserSettingsParkingPreferences(props: UserSettingsParkingPreferencesProps) {
  return (
    <settingsStyled.AllSettingsContainer>
      <settingsStyled.AllSettingsHeader>Settings specific for the parking process</settingsStyled.AllSettingsHeader>

      <settingsStyled.SettingContainer>
        <settingsStyled.SettingDescription withGrow>
          Enable voice notifications
        </settingsStyled.SettingDescription>
        <ToggleSwitch
          value1="OFF"
          value2="ON"
          onChange={props.setVoiceNotifications}
          isOnByDefault={props.areVoiceNotificationsEnabled}
        />
      </settingsStyled.SettingContainer>

      <settingsStyled.SettingContainer>
        <settingsStyled.SettingDescription withGrow>
          Parking auto-search
        </settingsStyled.SettingDescription>
        <ToggleSwitch
          value1="OFF"
          value2="ON"
          onChange={props.setCheckingParkopediaUpdates}
          isOnByDefault={props.isParkingAutoSearchEnabled}
        />
      </settingsStyled.SettingContainer>

    </settingsStyled.AllSettingsContainer>
  );
}

const mapStateToProps = createStructuredSelector<RootReducer, UserSettingsParkingPreferencesOwnProps>({
  areVoiceNotificationsEnabled: areVoiceNotificationsEnabledSelector,
  isParkingAutoSearchEnabled: isParkingAutoSearchEnabledSelector,
});

const mapDispatchToProps: UserSettingsParkingPreferencesDispatchProps = {
  setVoiceNotifications,
  setCheckingParkopediaUpdates,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(UserSettingsParkingPreferences)
