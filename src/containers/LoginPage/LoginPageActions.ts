import { action, ActionType } from 'typesafe-actions';

import { SIGNIN_USER } from './constants';


export const signinUser = (email: string, password: string) => action(SIGNIN_USER, { email, password });
export type signinUserAction = ActionType<typeof signinUser>;
export type signinUserActionCreator = (email: string, password: string) => signinUserAction;
