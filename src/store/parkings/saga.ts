import { push } from 'connected-react-router';
import { all, call, put, select, takeEvery, takeLatest, throttle } from 'redux-saga/effects';

import {
  centerCoordinatesSelector,
  latLonSelector,
} from './selectors';
import { prepareParkingParametersFromClientToServer, prepareParkings } from './adapters';
import { searchRadiusSelector, sessionUidSelector } from '../../containers/BaseConfigPage/BaseConfigSelectors';
import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';
import * as ParkingsPageActions from './actions';
import {
  createParkingAttemptAction,
  createParkingError,
  createParkingSuccess,
  fetchParkingsRequest,
  setParkingsPageCenter,
} from './actions';
import { backendEndpoint } from '../../constants/backend';
import { MAX_SEARCH_RADIUS_TO_FETCH } from '../../containers/BaseConfigPage/BaseConfigConstants';
import serialize from '../../utils/serialize';
import * as parkingsConstants from './constants';
import { default as GeoLocationService } from '../../services/GeoLocation.service';
import { requestToFreeParkingsAPI } from '../../services/Authentication.service';


export function* fetchParkingsSaga() {
  const { lat, lon } = yield select(centerCoordinatesSelector);
  const searchRadius = yield select(searchRadiusSelector);

  const canFetchParkings = searchRadius < MAX_SEARCH_RADIUS_TO_FETCH;
  try {
    if (canFetchParkings) {
      yield put(ParkingsPageActions.fetchParkingsStart());
      const searchQuery = serialize({ lat, lon, radius: searchRadius });
      const rawResponseParkings: ResponseParkings = yield call(requestToFreeParkingsAPI, `${backendEndpoint}/parkings?${searchQuery}`);
      const preparedResponseParkings: PreparedParkings = prepareParkings(rawResponseParkings);
      yield put(ParkingsPageActions.fetchParkingsSuccess(preparedResponseParkings));
    }
  } catch (e) {
    console.error('fetch parkings:', e);
  }
}

export function* updateUrlLatLonSaga(action: ParkingsPageActions.setParkingsPageCenterAction) {
  try {
    yield put(push({
      search: `?lat=${action.payload.lat}&lon=${action.payload.lon}`,
    }));
  } catch (err) {
    console.error(err);
  }
}

export function* synchronizeLatLonSaga() {
  const { lat: latFromUrl, lon: lonFromUrl } = yield select(latLonSelector);
  yield put(setParkingsPageCenter(latFromUrl, lonFromUrl));
}

export function* checkForParkopediaUpdates() {
  yield put(fetchParkingsRequest());
}

export function* clearAllFreeSlotsSaga() {
  try {
    yield call(fetch, `${backendEndpoint}/admin/cloudevents/drop`, {
      method: 'POST',
    });
  } catch (e) {
    console.error('Failed to clear all free slots');
  }
}

export function* clearVisibleFreeSlotsSaga() {
  const { lat, lon } = yield select(centerCoordinatesSelector);
  const radius = yield select(searchRadiusSelector);
  const uid = yield select(sessionUidSelector);

  try {
    yield call(fetch, `${backendEndpoint}/admin/cloudevents/drop/area`, {
      method: 'POST',
      body: JSON.stringify({ lat, lon, radius, uid }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error('Failed to clear visible free slots');
  }

  yield put(fetchParkingsRequest());
}

function* detectGeoLocationSaga() {
  if ('geolocation' in navigator) {
    try {
      const location = yield call(GeoLocationService.getUserLocation);
      const { lat, lon } = yield call(GeoLocationService.getUserLatLon, location);
      yield put(setParkingsPageCenter(lat, lon));
    } catch (e) {
      console.error(e);
    }
  } else {
    /* geolocation IS NOT available */
  }
}

function* createParkingSaga(action: createParkingAttemptAction) {
  const preparedParkingParameters = prepareParkingParametersFromClientToServer(action.payload);
  try {
    const createdParking = yield call(requestToFreeParkingsAPI, `${backendEndpoint}/parkings`, {
      method: 'PUT',
      body: JSON.stringify(preparedParkingParameters),
    });
    yield put(createParkingSuccess(createdParking));
  } catch (e) {
    yield put(createParkingError());
  }
}

export default function* defaultParkingsSaga() {
  yield all([
    throttle(3000, parkingsConstants.PARKINGS_REQUEST_FOR_FETCH, fetchParkingsSaga),
    takeEvery(parkingsConstants.CHANGE_CENTER_LOCATION, updateUrlLatLonSaga),
    takeEvery(parkingsConstants.CHECK_PARKOPEDIA_UPDATES_REQUEST, checkForParkopediaUpdates),
    takeLatest(parkingsConstants.SYNCHRONIZE_LAT_LON, synchronizeLatLonSaga),
    takeEvery(parkingsConstants.CLEAR_ALL_FREE_SLOTS, clearAllFreeSlotsSaga),
    takeEvery(parkingsConstants.CLEAR_VISIBLE_FREE_SLOTS, clearVisibleFreeSlotsSaga),
    takeEvery(parkingsConstants.ASK_PERMISSION_FOR_GEO_LOCATION, detectGeoLocationSaga),
    takeEvery(parkingsConstants.CREATE_PARKING_ATTEMPT, createParkingSaga),
  ]);
}
