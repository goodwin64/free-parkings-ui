import { UserGenderType, UserRole } from './UserInfo';


export interface ResponseLoginInfo {
  accessToken: string,
  personalInfo: {
    id: string,
    role: UserRole,
    username: string,
    avatarUrl: string,
    gender: UserGenderType,
    name?: string,
    surname?: string,
  },
}
