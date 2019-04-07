import { action, ActionType } from 'typesafe-actions';

import {
  NOT_ALLOWED_WITH_GUEST_PERMISSION,
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../../containers/App/constants';
import { UserAuthInfo } from '../../interfaces/UserAuthInfo';


export const signinUserAttempt = (username: string, password: string) => action(USER_SIGN_IN_ATTEMPT, { username, password });
export type signinUserAttemptAction = ActionType<typeof signinUserAttempt>;
export type signinUserAttemptActionCreator = (username: string, password: string) => signinUserAttemptAction;

export const signinUserSuccess = (userAuthInfo: UserAuthInfo) => action(USER_SIGN_IN_SUCCESS, userAuthInfo);
export type signinUserSuccessAction = ActionType<typeof signinUserSuccess>;
export type signinUserSuccessActionCreator = (userAuthInfo: UserAuthInfo) => signinUserSuccessAction;

export const signinUserError = () => action(USER_SIGN_IN_ERROR);
export type signinUserErrorAction = ActionType<typeof signinUserError>;
export type signinUserErrorActionCreator = () => signinUserErrorAction;

export const userSignOut = () => action(USER_SIGN_OUT);
export type userSignOutAction = ActionType<typeof userSignOut>;
export type userSignOutActionCreator = () => userSignOutAction;

export const notAllowedWithGuestPermission = () => action(NOT_ALLOWED_WITH_GUEST_PERMISSION);
export type notAllowedWithGuestPermissionAction = ActionType<typeof notAllowedWithGuestPermission>;
export type notAllowedWithGuestPermissionActionCreator = () => notAllowedWithGuestPermissionAction;

export type LoginPageAction = signinUserAttemptAction
  | signinUserSuccessAction
  | signinUserErrorAction
  | userSignOutAction
;
