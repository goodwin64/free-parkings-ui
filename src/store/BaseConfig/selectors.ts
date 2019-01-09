import { createSelector } from 'reselect';

import { RootReducer } from '../rootReducer';

export const configDomainSelector = (state: RootReducer) => state.config;

export const searchRadiusSelector = createSelector(
  [configDomainSelector],
  (configDomain) => configDomain.parkingSearchRadius
);
