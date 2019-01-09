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

export const defaultLatLonSelector = (state: RootReducer) => ({
  lat: state.parkingsPage.defaultCenterLat,
  lon: state.parkingsPage.defaultCenterLon,
});

export const geoCoordinatesSelector = createSelector(
  [routeParamsSelector, defaultLatLonSelector],
  ({ lat, lon }: { lat?: number, lon?: number }, defaultLatLon) => ({
    lat: Number(lat) || defaultLatLon.lat,
    lon: Number(lon) || defaultLatLon.lon,
  }),
);

const parkingsPageDomainSelector = (state: RootReducer) => state.parkingsPage;

export const parkopediaResponseSelector = createSelector(
  [],
  () => ({
    'allParkings': [{
      'parkingGeometry': [[48.855817764775914, 2.3566065264493545], [48.855794822684025, 2.35674801297489], [48.85577188058161, 2.3568559718877395]],
      'parkingGeometryType': 'polyline',
      'id': 1584898895,
    }, {
      'parkingGeometry': [[48.85583262350871, 2.356515677686616], [48.85581938769167, 2.3565988261660777]],
      'parkingGeometryType': 'polyline',
      'id': -1125649461,
    }, {
      'parkingGeometry': [[48.855894882386615, 2.3564486224612438], [48.85609077182605, 2.3565612752398692]],
      'parkingGeometryType': 'polyline',
      'id': -756079677,
    }, {
      'parkingGeometry': [[48.85574611761079, 2.356974122944621], [48.85570905725023, 2.357092140141276]],
      'parkingGeometryType': 'polyline',
      'id': 19619699,
    }, {
      'parkingGeometry': [[48.85568575851105, 2.357163270478736], [48.85560193136475, 2.3574502668433297]],
      'parkingGeometryType': 'polyline',
      'id': -1518678633,
    }, {
      'parkingGeometry': [[48.85548654142341, 2.35607723905855], [48.85570625699402, 2.3562958390932636]],
      'parkingGeometryType': 'polyline',
      'id': -1443129725,
    }, {
      'parkingGeometry': [[48.855261502099815, 2.3558557238784488], [48.85547857147646, 2.35607030059964]],
      'parkingGeometryType': 'polyline',
      'id': 374350032,
    }, {
      'parkingGeometry': [[48.85655878789637, 2.3570636992575373], [48.85649349211217, 2.357270229351684]],
      'parkingGeometryType': 'polyline',
      'id': 802557558,
    }, {
      'parkingGeometry': [[48.856600950909396, 2.356923048077533], [48.856562126432046, 2.357051794110248]],
      'parkingGeometryType': 'polyline',
      'id': 364069312,
    }, {
      'parkingGeometry': [[48.8566427265856, 2.3569501235595], [48.856554489167124, 2.3572612598052274]],
      'parkingGeometryType': 'polyline',
      'id': 180772255,
    }],
    'freeSlots': [{
      'freeSlotsGeometry': [[2.3565156776867, 48.8558326235088]],
      'id': -1872756967,
    }, { 'freeSlotsGeometry': [[2.3565156776865, 48.85583262353]], 'id': -1872733884 }],
  })
);

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

export const centerCoordinatesSelector = createSelector(
  [parkingsPageDomainSelector],
  (parkingsPageDomain) => ({
    lat: parkingsPageDomain.centerLat,
    lon: parkingsPageDomain.centerLon,
  }),
);
