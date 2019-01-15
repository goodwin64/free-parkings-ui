import { createSelector } from 'reselect';

import { RootReducer } from '../../store/rootReducer';

export const configDomainSelector = (state: RootReducer) => state.config;

export const searchRadiusSelector = createSelector(
  [configDomainSelector],
  (configDomain) => configDomain.parkingSearchRadius
);

export const defaultLatLonSelector = createSelector(
  [configDomainSelector],
  (configDomain) => ({
    lat: configDomain.startPointLat,
    lon: configDomain.startPointLon,
  })
);

export const sessionUidSelector = createSelector(
  [configDomainSelector],
  (configDomain) => configDomain.sessionUid,
);
