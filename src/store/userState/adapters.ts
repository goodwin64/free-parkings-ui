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
