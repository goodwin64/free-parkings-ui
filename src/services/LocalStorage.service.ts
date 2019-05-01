import { UserInfo, UserInfoRequiredForAuth } from '../interfaces/UserInfo';
import { userInfoSelector } from '../store/userState/selectors';
import { call, select } from 'redux-saga/effects';


export default class LocalStorageService {
  public static getUserInfo(): UserInfo | null {
    const userAuthInfoJSON: string | null = localStorage.getItem('userInfo');
    if (!userAuthInfoJSON) {
      return null;
    }
    return JSON.parse(userAuthInfoJSON);
  }

  public static hasUserInfo() {
    return Boolean(localStorage.getItem('userInfo'));
  }

  public static getAccessToken() {
    const userInfo = LocalStorageService.getUserInfo();
    if (!userInfo || !userInfo.accessToken) {
      return null;
    }
    return userInfo.accessToken;
  }

  public static getUserInfoRequiredForAuth(): UserInfoRequiredForAuth | null {
    const userAuthInfoJSON: string | null = localStorage.getItem('userInfoAuth');
    if (!userAuthInfoJSON) {
      return null;
    }
    return JSON.parse(userAuthInfoJSON);
  }

  public static saveUserInfoRequiredForAuth(info: UserInfoRequiredForAuth) {
    localStorage.setItem('userInfoAuth', JSON.stringify(info));
  }

  public static removeUserInfo() {
    localStorage.removeItem('userInfo');
  }
}

export function* updateUserInfoLocallySaga() {
  const userInfo = yield select(userInfoSelector);
  yield call(LocalStorageService.saveUserInfoRequiredForAuth, {
    id: userInfo.id,
    accessToken: userInfo.accessToken,
  });
}
