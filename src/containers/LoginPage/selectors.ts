import { RootReducer } from '../../store/rootReducer';

export const areCredentialsInvalidSelector = (state: RootReducer) => state.authInfo.isError;
export const isSigninAttemptInProgressSelector = (state: RootReducer) => state.authInfo.isLoading;
