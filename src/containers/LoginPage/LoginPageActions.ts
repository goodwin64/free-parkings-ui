import { action, ActionType } from 'typesafe-actions';

import { USER_SIGN_IN_ATTEMPT, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS } from '../App/constants';
import { UserAuthInfo } from '../../interfaces/UserAuthInfo';


export const signinUserAttempt = (email: string, password: string) => action(USER_SIGN_IN_ATTEMPT, { email, password });
export type signinUserAttemptAction = ActionType<typeof signinUserAttempt>;
export type signinUserAttemptActionCreator = (email: string, password: string) => signinUserAttemptAction;

export const signinUserSuccess = (userAuthInfo: UserAuthInfo) => action(USER_SIGN_IN_SUCCESS, userAuthInfo);
export type signinUserSuccessAction = ActionType<typeof signinUserSuccess>;
export type signinUserSuccessActionCreator = (userAuthInfo: UserAuthInfo) => signinUserSuccessAction;

export const signinUserError = () => action(USER_SIGN_IN_ERROR);
export type signinUserErrorAction = ActionType<typeof signinUserError>;
export type signinUserErrorActionCreator = () => signinUserErrorAction;

export type LoginPageAction = signinUserAttemptAction
  | signinUserSuccessAction
  | signinUserErrorAction
;

