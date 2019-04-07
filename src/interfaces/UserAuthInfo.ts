export interface UserAuthInfo {
  isAuthorized: boolean,
  accessToken?: string,
  role: USER_ROLE_GUEST | USER_ROLE_ADMIN | USER_ROLE_DRIVER,
}

type USER_ROLE_GUEST = 'GUEST';
type USER_ROLE_ADMIN = 'ADMIN';
type USER_ROLE_DRIVER = 'DRIVER';

