import { UserAction } from './actions';
import {
  INIT_USER_INFO_ON_LOAD,
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_UP_ATTEMPT,
  USER_SIGN_UP_ERROR,
  USER_SIGN_UP_SUCCESS,
} from '../../containers/App/constants';
import { UserInfo } from '../../interfaces/UserInfo';


export const USER_ROLE_GUEST = 'GUEST';
export const USER_ROLE_ADMIN = 'ADMIN';
export const USER_ROLE_DRIVER = 'DRIVER';

export const userInitialState: UserInfo = {
  id: -1,
  isLoginInProgress: false,
  isSignupInProgress: false,
  isLoginError: false,
  signupError: null,
  isAuthorized: false,
  role: USER_ROLE_GUEST,
  avatarUrl: 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png',
  username: 'default username',
};

export default function userReducer(
  state: UserInfo = userInitialState,
  action: UserAction,
): UserInfo {
  switch (action.type) {
    case INIT_USER_INFO_ON_LOAD: {
      return {
        ...state,
        ...action.payload,
        isAuthorized: true,
      };
    }
    case USER_SIGN_IN_ATTEMPT: {
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
        avatarUrl: action.payload.avatarUrl,
        username: action.payload.username,
        gender: action.payload.gender,
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
    case USER_SIGN_OUT_SUCCESS: {
      return userInitialState;
    }
    case USER_SIGN_UP_ATTEMPT: {
      return {
        ...state,
        isSignupInProgress: true,
        signupError: null,
      };
    }
    case USER_SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSignupInProgress: false,
        signupError: null,
      };
    }
    case USER_SIGN_UP_ERROR: {
      return {
        ...state,
        isSignupInProgress: false,
        signupError: action.payload.signupError,
      };
    }
    default: {
      return state;
    }
  }
}
