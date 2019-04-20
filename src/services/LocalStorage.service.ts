import { UserInfo } from '../interfaces/UserInfo';
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

  public static setUserInfo(info: UserInfo) {
    localStorage.setItem('userInfo', JSON.stringify(info));
  }

  public static removeUserInfo() {
    localStorage.removeItem('userInfo');
  }
}

export function* updateUserInfoLocallySaga() {
  const userInfo = yield select(userInfoSelector);
  yield call(LocalStorageService.setUserInfo, userInfo);
}
