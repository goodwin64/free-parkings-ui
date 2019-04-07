import { RootReducer } from '../rootReducer';

export const userStateSelector = (state: RootReducer) => state.user;

export const areCredentialsInvalidSelector = (state: RootReducer) => state.user.isLoginError;

export const isSigninAttemptInProgressSelector = (state: RootReducer) => state.user.isLoginInProgress;

export const userPersonalInfoSelector = (state: RootReducer) => state.user.userPersonalInfo;
