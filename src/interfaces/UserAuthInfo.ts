export interface UserAuthInfo {
  accessToken?: string,
  role: USER_ROLE_GUEST | USER_ROLE_ADMIN | USER_ROLE_DRIVER,
}

type USER_ROLE_GUEST = 'GUEST';
type USER_ROLE_ADMIN = 'ADMIN';
type USER_ROLE_DRIVER = 'DRIVER';

export const USER_ROLE_GUEST = 'GUEST';
export const USER_ROLE_ADMIN = 'ADMIN';
export const USER_ROLE_DRIVER = 'DRIVER';
