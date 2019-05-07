import { action, ActionType } from 'typesafe-actions';

import * as constants from './constants';
import { UserInfo, UserRole } from '../../interfaces/UserInfo';


export const loadAllUsersAttempt = () => action(constants.LOAD_ALL_USERS_ATTEMPT);
export type loadAllUsersAttemptAction = ActionType<typeof loadAllUsersAttempt>;
export type loadAllUsersAttemptActionCreator = () => loadAllUsersAttemptAction;


export const loadAllUsersSuccess = (users: UserInfo[]) => action(constants.LOAD_ALL_USERS_SUCCESS, users);
export type loadAllUsersSuccessAction = ActionType<typeof loadAllUsersSuccess>;
export type loadAllUsersSuccessActionCreator = (users: UserInfo[]) => loadAllUsersSuccessAction;


export const loadAllUsersError = () => action(constants.LOAD_ALL_USERS_ERROR);
export type loadAllUsersErrorAction = ActionType<typeof loadAllUsersError>;
export type loadAllUsersErrorActionCreator = () => loadAllUsersErrorAction;


export const setUserRoleAttempt = (id: string, role: UserRole) => action(constants.SET_USER_ROLE_ATTEMPT, { id, role });
export type setUserRoleAttemptAction = ActionType<typeof setUserRoleAttempt>;
export type setUserRoleAttemptActionCreator = (id: string, role: UserRole) => setUserRoleAttemptAction;


export const setUserRoleSuccess = (id: string, role: UserRole) => action(constants.SET_USER_ROLE_SUCCESS, { id, role });
export type setUserRoleSuccessAction = ActionType<typeof setUserRoleSuccess>;
export type setUserRoleSuccessActionCreator = (id: string, role: UserRole) => setUserRoleSuccessAction;


export const setUserRoleError = () => action(constants.SET_USER_ROLE_ERROR);
export type setUserRoleErrorAction = ActionType<typeof setUserRoleError>;
export type setUserRoleErrorActionCreator = () => setUserRoleErrorAction;


export type AllUsersAction = loadAllUsersAttemptAction
  | loadAllUsersSuccessAction
  | loadAllUsersErrorAction
  | setUserRoleAttemptAction
  | setUserRoleSuccessAction
  | setUserRoleErrorAction
;
