import { createSelector } from 'reselect';

import { RootReducer } from '../../store/rootReducer';
import { MAX_SEARCH_RADIUS_TO_FETCH } from './BaseConfigConstants';

export const configDomainSelector = (state: RootReducer) => state.config;

export const searchRadiusSelector = createSelector(
  [configDomainSelector],
  (configDomain) => configDomain.parkingSearchRadius,
);

export const isSearchRadiusTooBigSelector = createSelector(
  [searchRadiusSelector],
  (searchRadius) => searchRadius > MAX_SEARCH_RADIUS_TO_FETCH,
);

export const defaultLatLonSelector = createSelector(
  [configDomainSelector],
  (configDomain) => ({
    lat: configDomain.startPointLat,
    lon: configDomain.startPointLon,
  }),
);

export const sessionUidSelector = createSelector(
  [configDomainSelector],
  (configDomain) => configDomain.sessionUid,
);
