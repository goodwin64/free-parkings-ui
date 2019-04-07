import { UserAuthInfo } from '../interfaces/UserAuthInfo';
import { defaultUserAuthInfo } from '../store/userState/reducer';


export default class LocalStorageService {
  public static getAuthInfo(): UserAuthInfo {
    const userAuthInfoJSON: string | null = localStorage.getItem('userAuthInfo');
    if (!userAuthInfoJSON) {
      return defaultUserAuthInfo;
    }
    return JSON.parse(userAuthInfoJSON);
  }

  public static hasAuthInfo() {
    return Boolean(localStorage.getItem('userAuthInfo'));
  }

  public static getAccessToken() {
    return LocalStorageService.getAuthInfo().accessToken;
  }

  public static setAuthInfo(info: UserAuthInfo) {
    localStorage.setItem('userAuthInfo', JSON.stringify(info));
  }

  public static removeAuthInfo() {
    localStorage.removeItem('userAuthInfo');
  }
}
