import { LoginPageAction } from './actions';
import {
  INIT_USER_INFO_ON_LOAD,
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../../containers/App/constants';
import { UserInfo } from '../../interfaces/UserInfo';


export const USER_ROLE_GUEST = 'GUEST';
export const USER_ROLE_ADMIN = 'ADMIN';
export const USER_ROLE_DRIVER = 'DRIVER';

export const userInitialState: UserInfo = {
  isLoginInProgress: false,
  isLoginError: false,
  isAuthorized: false,
  role: USER_ROLE_GUEST,
  avatarUrl: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png',
  username: 'default username',
};

export default function userReducer(
  state: UserInfo = userInitialState,
  action: LoginPageAction,
) {
  switch (action.type) {
    case INIT_USER_INFO_ON_LOAD: {
      console.log('action', action);
      console.log('state', state);
      return {
        ...state,
        ...action.payload,
      };
    }
    case USER_SIGN_IN_ATTEMPT: {
      console.log('reducer USER_SIGN_IN_ATTEMPT');
      return {
        ...state,
        isLoginInProgress: true,
        isLoginError: false,
      };
    }
    case USER_SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoginInProgress: false,
        isLoginError: false,
        isAuthorized: true,
        accessToken: action.payload.accessToken,
        role: action.payload.role,
        // avatarUrl: action.payload.avatarUrl ? action.payload.avatarUrl : userInitialState.avatarUrl,
        // username: action.payload.username ? action.payload.username : userInitialState.username,
        // gender: action.payload.gender ? action.payload.gender : userInitialState.gender,
      };
    }
    case USER_SIGN_IN_ERROR: {
      return {
        ...state,
        isLoginInProgress: false,
        isLoginError: true,
        isAuthorized: false,
        avatarUrl: userInitialState.avatarUrl,
        username: userInitialState.username,
        gender: userInitialState.gender,
      };
    }
    case USER_SIGN_OUT: {
      return userInitialState;
    }
    default: {
      return state;
    }
  }
}
