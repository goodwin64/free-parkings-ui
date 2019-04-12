import { RootReducer } from '../rootReducer';

export const userInfoSelector = (state: RootReducer) => state.user;

export const areCredentialsInvalidSelector = (state: RootReducer) => state.user.isLoginError;

export const isSigninAttemptInProgressSelector = (state: RootReducer) => state.user.isLoginInProgress;

export const isUserAuthorizedSelector = (state: RootReducer) => state.user.isAuthorized;

export const userAccessTokenSelector = (state: RootReducer) => {
  // debugger;
  return state.user.accessToken;
}
