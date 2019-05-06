import { RootReducer } from '../rootReducer';


export const areVoiceNotificationsEnabledSelector = (state: RootReducer) => state.parkingSettings.areVoiceNotificationsEnabled;

export const isParkingAutoSearchEnabledSelector = (state: RootReducer) => state.parkingSettings.isParkingAutoSearchEnabled;
