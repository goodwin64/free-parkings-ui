import { action, ActionType } from 'typesafe-actions';

import { NOT_ALLOWED_WITH_GUEST_PERMISSION, USER_SIGN_OUT } from './constants';


export const notAllowedWithGuestPermission = () => action(NOT_ALLOWED_WITH_GUEST_PERMISSION);
export type notAllowedWithGuestPermissionAction = ActionType<typeof notAllowedWithGuestPermission>;
export type notAllowedWithGuestPermissionActionCreator = () => notAllowedWithGuestPermissionAction;

export const userSignOut = () => action(USER_SIGN_OUT);
export type userSignOutAction = ActionType<typeof userSignOut>;
export type userSignOutActionCreator = () => userSignOutAction;
