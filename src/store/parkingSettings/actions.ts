import { action, ActionType } from 'typesafe-actions';

import * as constants from './constants';


export const setVoiceNotifications = (isEnabled: boolean) => action(constants.SET_VOICE_NOTIFICATIONS, isEnabled);
export type setVoiceNotificationsAction = ActionType<typeof setVoiceNotifications>;
export type setVoiceNotificationsActionCreator = (isEnabled: boolean) => setVoiceNotificationsAction;


export const startCheckingParkopediaUpdates = () => action(constants.START_CHECKING_PARKOPEDIA_UPDATES);
export type startCheckingParkopediaUpdatesAction = ActionType<typeof startCheckingParkopediaUpdates>;
export type startCheckingParkopediaUpdatesActionCreator = () => startCheckingParkopediaUpdatesAction;


export const stopCheckingParkopediaUpdates = () => action(constants.STOP_CHECKING_PARKOPEDIA_UPDATES);
export type stopCheckingParkopediaUpdatesAction = ActionType<typeof stopCheckingParkopediaUpdates>;
export type stopCheckingParkopediaUpdatesActionCreator = () => stopCheckingParkopediaUpdatesAction;


export const setCheckingParkopediaUpdates = (isEnabled: boolean) => action(constants.SET_CHECKING_PARKOPEDIA_UPDATES, isEnabled);
export type setCheckingParkopediaUpdatesAction = ActionType<typeof setCheckingParkopediaUpdates>;
export type setCheckingParkopediaUpdatesActionCreator = (isEnabled: boolean) => setCheckingParkopediaUpdatesAction;


export type ParkingSettingsAction = setVoiceNotificationsAction
  | startCheckingParkopediaUpdatesAction
  | stopCheckingParkopediaUpdatesAction
  | setCheckingParkopediaUpdatesAction
  ;