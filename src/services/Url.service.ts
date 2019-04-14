import * as path from 'path';

import { UserInfo } from '../interfaces/UserInfo';
import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST } from '../store/userState/reducer';


export default class UrlService {
  private static rootUrl = '/';

  public static readonly loginPageUrl = path.join(UrlService.rootUrl, '/login');

  public static readonly signupPageUrl = path.join(UrlService.rootUrl, '/signup');

  public static readonly configPageUrl = path.join(UrlService.rootUrl, '/config');

  public static readonly adminDashboardPageUrl = path.join(UrlService.rootUrl, '/dashboard');

  public static readonly driverPageUrl = path.join(UrlService.rootUrl, '/driver');

  public static readonly driverAccountPageUrl = path.join(UrlService.rootUrl, '/my-account');

  public static readonly findParkingsPageUrl = path.join(UrlService.rootUrl, '/find-parkings');

  public static readonly myDrivesPageUrl = path.join(UrlService.rootUrl, '/my-drives');

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
