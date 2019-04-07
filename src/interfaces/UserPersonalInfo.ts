export type UserGenderType = 'male' | 'female';

export interface UserPersonalInfo {
  readonly avatarUrl: string,
  readonly username: string,
  readonly gender?: UserGenderType,
}

export const defaultUserPersonalInfo: UserPersonalInfo = {
  avatarUrl: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png',
  username: '',
};
