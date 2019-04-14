import * as path from 'path';

import { UserInfo } from '../interfaces/UserInfo';
import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST } from '../store/userState/reducer';


export default class UrlService {
  private static rootUrl = '/';

  public static readonly loginPageUrl = path.join(UrlService.rootUrl, '/login');
  public static readonly loginPageRolesAllowed = new Set([
    USER_ROLE_GUEST,
  ]);

  public static readonly signupPageUrl = path.join(UrlService.rootUrl, '/signup');
  public static readonly signupPageRolesAllowed = new Set([
    USER_ROLE_GUEST,
  ]);

  public static readonly configPageUrl = path.join(UrlService.rootUrl, '/config');
  public static readonly configPageRolesAllowed = new Set([
    USER_ROLE_DRIVER, USER_ROLE_ADMIN,
  ]);

  public static readonly dashboardPageUrl = path.join(UrlService.rootUrl, '/dashboard');
  public static readonly dashboardPageRolesAllowed = new Set([
    USER_ROLE_DRIVER, USER_ROLE_ADMIN,
  ]);

  public static readonly settingsPageUrl = path.join(UrlService.rootUrl, '/driver-account');
  public static readonly settingsPageRolesAllowed = new Set([
    USER_ROLE_DRIVER, USER_ROLE_ADMIN,
  ]);

  public static readonly findParkingsPageUrl = path.join(UrlService.rootUrl, '/find-parkings');
  public static readonly findParkingsPageRolesAllowed = new Set([
    USER_ROLE_DRIVER, USER_ROLE_ADMIN,
  ]);

  public static readonly myDrivesPageUrl = path.join(UrlService.rootUrl, '/my-drives');
  public static readonly myDrivesPageRolesAllowed = new Set([
    USER_ROLE_DRIVER, USER_ROLE_ADMIN,
  ]);

  public static readonly detectPageByUserInfo = function(userInfo: UserInfo): string {
    if (!userInfo || !userInfo.role || userInfo.role === USER_ROLE_GUEST) {
      return UrlService.loginPageUrl;
    } else if (userInfo.role === USER_ROLE_ADMIN || userInfo.role === USER_ROLE_DRIVER) {
      return UrlService.dashboardPageUrl;
    }
    return UrlService.rootUrl;
  };

  public static readonly isRouteAllowed = function(userInfo: UserInfo, routeRolesAllowed: Set<string>): boolean {
    return routeRolesAllowed.has(userInfo.role);
  }
}
