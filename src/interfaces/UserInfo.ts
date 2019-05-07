import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST } from './UserAuthInfo';

export type UserGenderType = 'male' | 'female' | 'n/a';
export type UserRole = USER_ROLE_GUEST | USER_ROLE_ADMIN | USER_ROLE_DRIVER;

export interface UserInfoRequiredForAuth {
  readonly id: string,
  readonly accessToken?: string,
}

export interface UserInfo extends UserInfoRequiredForAuth {
  readonly isLoginInProgress: boolean,
  readonly isSignupInProgress: boolean,
  readonly isLoginError: boolean,
  readonly signupError: string | null,
  readonly isAuthorized: boolean,
  readonly role: UserRole,
  readonly imageUrl: string,
  readonly username: string,
  readonly fullname: string,
  readonly gender?: UserGenderType,
  readonly defaultCountry: string,
}
