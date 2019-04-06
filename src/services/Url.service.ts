import * as path from 'path';

export default class UrlService {
  private static rootUrl = '/';

  public static readonly loginPageUrl = path.join(UrlService.rootUrl, '/login');

  public static readonly parkingsPageUrl = path.join(UrlService.rootUrl, '/parkings');

  public static readonly adminDashboardPageUrl = path.join(UrlService.rootUrl, '/dashboard');

  public static readonly driverPageUrl = path.join(UrlService.rootUrl, '/driver');
}
