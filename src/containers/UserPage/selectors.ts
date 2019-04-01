// import { createSelector } from 'reselect';

import { RootReducer } from '../../store/rootReducer';

export const userSelector = (state: RootReducer) => state.user;
