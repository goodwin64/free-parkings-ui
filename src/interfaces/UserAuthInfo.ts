export type USER_ROLE_GUEST = 'GUEST';
export type USER_ROLE_ADMIN = 'ADMIN';
export type USER_ROLE_DRIVER = 'DRIVER';

export interface UserAuthInfo {
  role: USER_ROLE_DRIVER | USER_ROLE_GUEST | USER_ROLE_ADMIN,
}
