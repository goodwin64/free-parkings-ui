import { action, ActionType } from 'typesafe-actions';

import {
  INIT_USER_INFO_ON_LOAD,
  NOT_ALLOWED_WITH_GUEST_PERMISSION,
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_ATTEMPT,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_UP_ATTEMPT,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP_SUCCESS,
} from '../../containers/App/constants';
import {
  USER_UPDATE_AVATAR,
  USER_UPDATE_DEFAULT_COUNTRY,
  USER_UPDATE_FULLNAME,
  USER_UPDATE_GENDER,
  USER_UPDATE_USERNAME,
} from './constants';
import { UserGenderType, UserInfo } from '../../interfaces/UserInfo';


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

export const signupUserAttempt = (username: string, password: string) => action(USER_SIGN_UP_ATTEMPT, { username, password });
export type signupUserAttemptAction = ActionType<typeof signupUserAttempt>;
export type signupUserAttemptActionCreator = (username: string, password: string) => signupUserAttemptAction;

export const signupUserSuccess = () => action(USER_SIGN_UP_SUCCESS);
export type signupUserSuccessAction = ActionType<typeof signupUserSuccess>;
export type signupUserSuccessActionCreator = () => signupUserSuccessAction;

export const signupUserError = (signupError: string | null) => action(USER_SIGN_UP_ERROR, { signupError });
export type signupUserErrorAction = ActionType<typeof signupUserError>;
export type signupUserErrorActionCreator = (signupError: string | null) => signupUserErrorAction;

export const notAllowedWithGuestPermission = () => action(NOT_ALLOWED_WITH_GUEST_PERMISSION);
export type notAllowedWithGuestPermissionAction = ActionType<typeof notAllowedWithGuestPermission>;
export type notAllowedWithGuestPermissionActionCreator = () => notAllowedWithGuestPermissionAction;

export const updateAvatar = (avatarUrl: string) => action(USER_UPDATE_AVATAR, avatarUrl);
export type updateAvatarAction = ActionType<typeof updateAvatar>;
export type updateAvatarActionCreator = (avatarUrl: string) => updateAvatarAction;

export const updateUsername = (username: string) => action(USER_UPDATE_USERNAME, username);
export type updateUsernameAction = ActionType<typeof updateUsername>;
export type updateUsernameActionCreator = (username: string) => updateUsernameAction;

export const updateFullname = (fullname: string) => action(USER_UPDATE_FULLNAME, fullname);
export type updateFullnameAction = ActionType<typeof updateFullname>;
export type updateFullnameActionCreator = (fullname: string) => updateFullnameAction;

export const updateGender = (gender: UserGenderType) => action(USER_UPDATE_GENDER, gender);
export type updateGenderAction = ActionType<typeof updateGender>;
export type updateGenderActionCreator = (gender: UserGenderType) => updateGenderAction;

export const updateDefaultCountry = (country: string) => action(USER_UPDATE_DEFAULT_COUNTRY, country);
export type updateDefaultCountryAction = ActionType<typeof updateDefaultCountry>;
export type updateDefaultCountryActionCreator = (country: string) => updateDefaultCountryAction;

export type UserAction = initUserInfoOnLoadAction
  | signinUserAttemptAction
  | signinUserSuccessAction
  | signinUserErrorAction
  | userSignOutAttemptAction
  | userSignOutSuccessAction
  | signupUserAttemptAction
  | signupUserSuccessAction
  | signupUserErrorAction
  | updateAvatarAction
  | updateUsernameAction
  | updateFullnameAction
  | updateGenderAction
  | updateDefaultCountryAction
;
