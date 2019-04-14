import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST } from './UserAuthInfo';

export type UserGenderType = 'male' | 'female';
export type UserRole = USER_ROLE_GUEST | USER_ROLE_ADMIN | USER_ROLE_DRIVER;

export interface UserInfo {
  readonly isLoginInProgress: boolean,
  readonly isSignupInProgress: boolean,
  readonly isLoginError: boolean,
  readonly signupError: string | null,
  readonly isAuthorized: boolean,
  readonly accessToken?: string,
  readonly role: UserRole,
  readonly avatarUrl: string,
  readonly username: string,
  readonly gender?: UserGenderType,
}
