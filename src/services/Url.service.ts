import * as path from 'path';

import { UserInfo } from '../interfaces/UserInfo';
import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST } from '../store/userState/reducer';


export default class UrlService {
  private static rootUrl = '/';

  public static readonly loginPageUrl = path.join(UrlService.rootUrl, '/login');

  public static readonly parkingsPageUrl = path.join(UrlService.rootUrl, '/parkings');

  public static readonly adminDashboardPageUrl = path.join(UrlService.rootUrl, '/dashboard');

  public static readonly driverPageUrl = path.join(UrlService.rootUrl, '/driver');

  public static readonly detectPageByUserInfo = function(userInfo: UserInfo): string {
    if (!userInfo || !userInfo.role || userInfo.role === USER_ROLE_GUEST) {
      return UrlService.loginPageUrl;
    } else if (userInfo.role === USER_ROLE_ADMIN) {
      return UrlService.adminDashboardPageUrl;
    } else if (userInfo.role === USER_ROLE_DRIVER) {
      return UrlService.driverPageUrl;
    }
    return UrlService.rootUrl;
  };
}
