import * as path from 'path';

export default class UrlService {
  private static get rootUrl() {
    return '/';
  }

  public static get parkingsPageUrl() {
    return path.join(UrlService.rootUrl, '/parkings');
  }

  public static get loginPageUrl() {
    return path.join(UrlService.rootUrl, '/login');
  }
}
