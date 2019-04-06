import { defaultUserAuthInfo } from './Authentication.service';
import { UserAuthInfo } from '../interfaces/UserAuthInfo';


export default class LocalStorageService {
  public static getAuthInfo(): UserAuthInfo {
    const userAuthInfoJSON: string | null = localStorage.getItem('authInfo');
    if (!userAuthInfoJSON) {
      return defaultUserAuthInfo;
    }
    return JSON.parse(userAuthInfoJSON);
  }

  public static hasAuthInfo() {
    return Boolean(localStorage.getItem('authInfo'));
  }

  public static getAccessToken() {
    return LocalStorageService.getAuthInfo().accessToken;
  }

  public static setAuthInfo(info: UserAuthInfo) {
    localStorage.setItem('authInfo', JSON.stringify(info));
  }

  public static removeAuthInfo() {
    localStorage.removeItem('authInfo');
  }
}
