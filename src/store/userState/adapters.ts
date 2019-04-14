import isString from 'lodash/isString';

import { UserInfo } from '../../interfaces/UserInfo';
import { userInitialState } from './reducer';


export function userInfoAdapter (userInfoResponse: any): UserInfo {
  if (!userInfoResponse) {
    return userInitialState;
  }

  return {
    ...userInfoResponse.authInfo,
    ...userInfoResponse.personalInfo,
  }
}

export function signupErrorAdapter(err: any): string | null {
  if (!err) {
    return null;
  }
  if (isString(err)) {
    return err;
  }
  if ('message' in err) {
    return err.message;
  }
  return null;
}
