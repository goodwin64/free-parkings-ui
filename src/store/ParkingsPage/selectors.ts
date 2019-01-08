import { createSelector } from 'reselect';
import { Search } from 'history';

import { RootReducer } from '../rootReducer';

export const routeLocationSelector = createSelector(
  [(state: RootReducer) => state.router],
  (routeState) => routeState.location,
);

export const routeParamsSelector = createSelector(
  [routeLocationSelector],
  paramsFromLocation,
);

function paramsFromLocation({ search }: { search: Search }) {
  let params = null;

  try {
    params = JSON.parse(decodeURI(search.slice(1)));
  } catch (e) {
    params = search
      .slice(1)
      .split('&')
      .reduce((params: any, currPair: string) => {
        const [key, value] = currPair.split('=');
        return {
          ...params,
          ...{ [key]: value },
        }
      }, {})
  }

  return params;
}

export const geoCoordinatesSelector = createSelector(
  [routeParamsSelector],
  ({ lat, lon }: { lat?: number, lon?: number }) => ({
    lat: Number(lat) || 0,
    lon: Number(lon) || 0,
  }),
);
