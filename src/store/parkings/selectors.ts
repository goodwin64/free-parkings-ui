import { createSelector } from 'reselect';
import { Search } from 'history';

import { RootReducer } from '../rootReducer';
import { defaultLatLonSelector } from '../../containers/BaseConfigPage/BaseConfigSelectors';
import { Parking } from '../../interfaces/Parking';
import { RouterProps } from '../../interfaces/RouterProps';

export const routeLocationSelector = (state: RootReducer) => state.router.location;
export const routerPropsSelector = (_: RootReducer, routerProps: RouterProps) => routerProps;

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

export const latLonSelector = createSelector(
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

export const busyParkingsSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => parkingsPageDomain.busyParkings,
);

export const freeParkingsSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => parkingsPageDomain.freeParkings,
);

export const allParkingsSelector = createSelector(
  [busyParkingsSelector, freeParkingsSelector],
  (busyParkings, freeParkings) => [
    ...busyParkings,
    ...freeParkings,
  ],
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

type selectedParkingSelector = (rr: RootReducer) => Parking | null;
// @ts-ignore
export const selectedParkingSelector: selectedParkingSelector = createSelector(
  [routerPropsSelector, allParkingsSelector],
  (routerProps, allParkings) => {
    const selectedParkingId = routerProps.match.params.selectedParkingId;
    const selectedParking = allParkings.find(({ id }) => id === selectedParkingId) || null;
    return selectedParking;
  },
);
