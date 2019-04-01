export type UserGenderType = 'male' | 'female';

export interface User {
  readonly isAuthorized: boolean,
  readonly avatarUrl: string,
  readonly name: string,
  readonly gender?: UserGenderType,
}
