import { action, ActionType } from 'typesafe-actions';

import {
  INIT_USER_INFO_ON_LOAD,
  NOT_ALLOWED_WITH_GUEST_PERMISSION,
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_ATTEMPT,
  USER_SIGN_OUT_SUCCESS,
} from '../../containers/App/constants';
import { UserInfo } from '../../interfaces/UserInfo';


export const initUserInfoOnLoad = (userInfo: UserInfo) => action(INIT_USER_INFO_ON_LOAD, userInfo);
export type initUserInfoOnLoadAction = ActionType<typeof initUserInfoOnLoad>;
export type initUserInfoOnLoadActionCreator = (userInfo: UserInfo) => initUserInfoOnLoadAction;

export const signinUserAttempt = (username: string, password: string) => action(USER_SIGN_IN_ATTEMPT, { username, password });
export type signinUserAttemptAction = ActionType<typeof signinUserAttempt>;
export type signinUserAttemptActionCreator = (username: string, password: string) => signinUserAttemptAction;

export const signinUserSuccess = (userInfo: UserInfo) => action(USER_SIGN_IN_SUCCESS, userInfo);
export type signinUserSuccessAction = ActionType<typeof signinUserSuccess>;
export type signinUserSuccessActionCreator = (userInfo: UserInfo) => signinUserSuccessAction;

export const signinUserError = () => action(USER_SIGN_IN_ERROR);
export type signinUserErrorAction = ActionType<typeof signinUserError>;
export type signinUserErrorActionCreator = () => signinUserErrorAction;

export const userSignOutAttempt = () => action(USER_SIGN_OUT_ATTEMPT);
export type userSignOutAttemptAction = ActionType<typeof userSignOutAttempt>;
export type userSignOutAttemptActionCreator = () => userSignOutAttemptAction;

export const userSignOutSuccess = () => action(USER_SIGN_OUT_SUCCESS);
export type userSignOutSuccessAction = ActionType<typeof userSignOutSuccess>;
export type userSignOutSuccessActionCreator = () => userSignOutSuccessAction;

export const notAllowedWithGuestPermission = () => action(NOT_ALLOWED_WITH_GUEST_PERMISSION);
export type notAllowedWithGuestPermissionAction = ActionType<typeof notAllowedWithGuestPermission>;
export type notAllowedWithGuestPermissionActionCreator = () => notAllowedWithGuestPermissionAction;

export type LoginPageAction = initUserInfoOnLoadAction
  | signinUserAttemptAction
  | signinUserSuccessAction
  | signinUserErrorAction
  | userSignOutAttemptAction
  | userSignOutSuccessAction
;
