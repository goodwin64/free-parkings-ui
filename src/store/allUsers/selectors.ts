import { RootReducer } from '../rootReducer';

export const allUsersSelector = (state: RootReducer) => state.allUsers.users;

export const allUsersPageIsInProgressSelector = (state: RootReducer) => state.allUsers.isInProgress;
