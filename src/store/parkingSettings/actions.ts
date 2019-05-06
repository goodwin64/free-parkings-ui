import { action, ActionType } from 'typesafe-actions';

import * as constants from './constants';


export const setVoiceNotifications = (isEnabled: boolean) => action(constants.SET_VOICE_NOTIFICATIONS, isEnabled);
export type setVoiceNotificationsAction = ActionType<typeof setVoiceNotifications>;
export type setVoiceNotificationsActionCreator = (isEnabled: boolean) => setVoiceNotificationsAction;

export type ParkingSettingsAction = setVoiceNotificationsAction
  ;
