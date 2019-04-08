import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST } from './UserAuthInfo';

export type UserGenderType = 'male' | 'female';

export interface UserInfo {
  readonly isLoginInProgress: boolean,
  readonly isLoginError: boolean,
  readonly isAuthorized: boolean,
  readonly accessToken?: string,
  readonly role: USER_ROLE_GUEST | USER_ROLE_ADMIN | USER_ROLE_DRIVER,
  readonly avatarUrl: string,
  readonly username: string,
  readonly gender?: UserGenderType,
}
