import isString from 'lodash/isString';

import { UserInfo } from '../../interfaces/UserInfo';
import { userInitialState } from './reducer';
import { ResponseLoginInfo } from '../../interfaces/ResponseLoginInfo';


export function userInfoAdapter (loginInfo: ResponseLoginInfo): UserInfo {
  if (!loginInfo) {
    return userInitialState;
  }

  return {
    ...userInitialState,
    accessToken: loginInfo.accessToken,
    ...loginInfo.personalInfo,
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
