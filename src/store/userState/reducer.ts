import { UserAuthInfo } from '../../interfaces/UserAuthInfo';
import { defaultUserPersonalInfo, UserPersonalInfo } from '../../interfaces/UserPersonalInfo';
import { LoginPageAction } from './actions';
import {
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_IN_ERROR,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
} from '../../containers/App/constants';

export const USER_ROLE_GUEST = 'GUEST';
export const USER_ROLE_ADMIN = 'ADMIN';
export const USER_ROLE_DRIVER = 'DRIVER';

export const defaultUserAuthInfo: UserAuthInfo = {
  role: USER_ROLE_GUEST,
  isAuthorized: false,
};

export interface UserState {
  isLoginInProgress: boolean,
  isLoginError: boolean,
  userAuthInfo: UserAuthInfo,
  userPersonalInfo: UserPersonalInfo,
}

const userInitialState: UserState = {
  isLoginInProgress: false,
  isLoginError: false,
  userAuthInfo: defaultUserAuthInfo,
  userPersonalInfo: defaultUserPersonalInfo,
};

export default function userReducer(
  state: UserState = userInitialState,
  action: LoginPageAction,
) {
  switch (action.type) {
    case USER_SIGN_IN_ATTEMPT: {
      return {
        ...state,
        userAuthInfo: userInitialState.userAuthInfo,
        userPersonalInfo: {
          ...state.userPersonalInfo,
          username: action.payload.username,
        },
        isLoginInProgress: true,
        isLoginError: false,
      };
    }
    case USER_SIGN_IN_SUCCESS: {
      return {
        ...state,
        userAuthInfo: {
          accessToken: action.payload.accessToken,
          role: action.payload.role,
          isAuthorized: true,
        },
        isLoginInProgress: false,
        isLoginError: false,
      };
    }
    case USER_SIGN_IN_ERROR: {
      return {
        ...state,
        userAuthInfo: userInitialState.userAuthInfo,
        userPersonalInfo: userInitialState.userPersonalInfo,
        isLoginInProgress: false,
        isLoginError: true,
      };
    }
    case USER_SIGN_OUT: {
      return {
        ...state,
        userAuthInfo: userInitialState.userAuthInfo,
        userPersonalInfo: userInitialState.userPersonalInfo,
      };
    }
    default: {
      return state;
    }
  }
}
