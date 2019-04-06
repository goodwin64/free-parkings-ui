import { USER_SIGN_IN_ATTEMPT, USER_SIGN_IN_ERROR, USER_SIGN_IN_SUCCESS } from '../App/constants';
import { LoginPageAction } from './LoginPageActions';

export interface LoginPageState {
  isLoading: boolean,
  isError: boolean,
  accessToken?: string,
}

const loginPageInitialState: LoginPageState = {
  isLoading: false,
  isError: false,
};

export default function loginPageReducer(
  state: LoginPageState = loginPageInitialState,
  action: LoginPageAction,
) {
  switch (action.type) {
    case USER_SIGN_IN_ATTEMPT: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case USER_SIGN_IN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
      }
    }
    case USER_SIGN_IN_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    }
    default: {
      return state;
    }
  }
}
