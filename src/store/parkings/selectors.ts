import { createSelector } from 'reselect';
import { Search } from 'history';

import { RootReducer } from '../rootReducer';
import { defaultLatLonSelector } from '../../containers/BaseConfigPage/BaseConfigSelectors';

export const routeLocationSelector = (state: RootReducer) => state.router.location;

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
        };
      }, {});
  }

  return params;
}

export const geoCoordinatesSelector = createSelector(
  [routeParamsSelector, defaultLatLonSelector],
  ({ lat: latFromUrl, lon: lonFromUrl }: { lat?: number, lon?: number }, defaultLatLon) => {
    return ({
      lat: isFinite(Number(latFromUrl)) ? Number(latFromUrl) : defaultLatLon.lat,
      lon: isFinite(Number(lonFromUrl)) ? Number(lonFromUrl) : defaultLatLon.lon,
    });
  },
);

export const zoomLevelSelector = (state: RootReducer) => state.parkingsPage.zoomLevel;

const parkingsPageDomainSelector = (state: RootReducer) => state.parkingsPage;

export const allParkingsSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => parkingsPageDomain.allParkings,
);

export const freeParkingsSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => parkingsPageDomain.freeParkings,
);

export const isParkingFetchInProgressSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => parkingsPageDomain.isFetchInProgress,
);

export const wasFetchPerformedSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => parkingsPageDomain.wasFetchPerformed,
);

export const centerCoordinatesSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => ({
    lat: parkingsPageDomain.centerLat,
    lon: parkingsPageDomain.centerLon,
  }),
);

export const centerCoordinatesLatitudeSelector = createSelector(
  [centerCoordinatesSelector],
  (centerCoordinates) => centerCoordinates.lat,
);

export const centerCoordinatesLongitudeSelector = createSelector(
  [centerCoordinatesSelector],
  (centerCoordinates) => centerCoordinates.lon,
);

export const lastParkingsCheckTimestampSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => parkingsPageDomain.lastParkingsCheckTimestamp,
);
