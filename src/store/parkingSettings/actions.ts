import { action, ActionType } from 'typesafe-actions';

import * as constants from './constants';


export const setVoiceNotifications = (isEnabled: boolean) => action(constants.SET_VOICE_NOTIFICATIONS, isEnabled);
export type setVoiceNotificationsAction = ActionType<typeof setVoiceNotifications>;
export type setVoiceNotificationsActionCreator = (isEnabled: boolean) => setVoiceNotificationsAction;


export const startCheckingParkingUpdates = () => action(constants.START_CHECKING_PARKING_UPDATES);
export type startCheckingParkingUpdatesAction = ActionType<typeof startCheckingParkingUpdates>;
export type startCheckingParkingUpdatesActionCreator = () => startCheckingParkingUpdatesAction;


export const stopCheckingParkingUpdates = () => action(constants.STOP_CHECKING_PARKING_UPDATES);
export type stopCheckingParkingUpdatesAction = ActionType<typeof stopCheckingParkingUpdates>;
export type stopCheckingParkingUpdatesActionCreator = () => stopCheckingParkingUpdatesAction;


export const setCheckingParkingUpdates = (isEnabled: boolean) => action(constants.SET_CHECKING_PARKING_UPDATES, isEnabled);
export type setCheckingParkingUpdatesAction = ActionType<typeof setCheckingParkingUpdates>;
export type setCheckingParkingUpdatesActionCreator = (isEnabled: boolean) => setCheckingParkingUpdatesAction;


export type ParkingSettingsAction = setVoiceNotificationsAction
  | startCheckingParkingUpdatesAction
  | stopCheckingParkingUpdatesAction
  | setCheckingParkingUpdatesAction
  ;