import * as path from 'path';

export default class UrlService {
  private static get rootUrl() {
    return '/';
  }

  public static get parkings() {
    console.log(path.join(UrlService.rootUrl, '/parkings'));
    return path.join(UrlService.rootUrl, '/parkings');
  }
}
