import * as constants from './constants';
import { ParkingSettingsAction } from './actions';


export interface UserSettingsParkingPreferencesOwnProps {
  areVoiceNotificationsEnabled: boolean,
  isParkingAutoSearchEnabled: boolean,
}

const parkingSettingsInitialState: UserSettingsParkingPreferencesOwnProps = {
  areVoiceNotificationsEnabled: false,
  isParkingAutoSearchEnabled: false,
};

export default function parkingSettingsReducer(
  state: UserSettingsParkingPreferencesOwnProps = parkingSettingsInitialState,
  action: ParkingSettingsAction,
): UserSettingsParkingPreferencesOwnProps {
  switch (action.type) {
    case constants.SET_VOICE_NOTIFICATIONS: {
      return {
        ...state,
        areVoiceNotificationsEnabled: action.payload,
      };
    }
    case constants.SET_CHECKING_PARKING_UPDATES: {
      return {
        ...state,
        isParkingAutoSearchEnabled: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}
