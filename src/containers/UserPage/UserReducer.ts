import { User } from '../../interfaces/User';

export interface UserState extends User {

}

export const UserPageInitialState: UserState = {
  avatarUrl: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png',
  name: '',
  gender: undefined,
  isAuthorized: true,
};

type UserPageAction = any;

export default function userReducer(
  state: UserState = UserPageInitialState,
  action: UserPageAction,
) {
  return state;
}
