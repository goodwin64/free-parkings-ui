import { RootReducer } from '../rootReducer';

export const userInfoSelector = (state: RootReducer) => state.user;

export const areCredentialsInvalidSelector = (state: RootReducer) => state.user.isLoginError;

export const signupErrorSelector = (state: RootReducer) => state.user.signupError;

export const isSigninAttemptInProgressSelector = (state: RootReducer) => state.user.isLoginInProgress;

export const isSignupAttemptInProgressSelector = (state: RootReducer) => state.user.isSignupInProgress;

export const isUserAuthorizedSelector = (state: RootReducer) => state.user.isAuthorized;

export const userAccessTokenSelector = (state: RootReducer) => state.user.accessToken;

export const usernameSelector = (state: RootReducer) => state.user.username;

export const avatarUrlSelector = (state: RootReducer) => state.user.avatarUrl;
