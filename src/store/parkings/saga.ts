import { push } from 'connected-react-router';
import { all, call, put, select, takeEvery, takeLatest, throttle } from 'redux-saga/effects';

import { centerCoordinatesSelector, latLonSelector } from './selectors';
import { prepareParkingParametersFromClientToServer, prepareParkings } from './adapters';
import { searchRadiusSelector, sessionUidSelector } from '../../containers/BaseConfigPage/BaseConfigSelectors';
import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';
import * as ParkingsPageActions from './actions';
import {
  deleteParkingAction,
  fetchParkingsRequest,
  postParkingAttemptAction,
  postParkingError,
  postParkingSuccess,
  setParkingsPageCenter,
} from './actions';
import { backendEndpoint } from '../../constants/backend';
import { MAX_SEARCH_RADIUS_TO_FETCH } from '../../containers/BaseConfigPage/BaseConfigConstants';
import serialize from '../../utils/serialize';
import * as parkingsConstants from './constants';
import { default as GeoLocationService } from '../../services/GeoLocation.service';
import { requestToFreeParkingsAPI } from '../../services/Authentication.service';
import { ParkingServerExpects } from '../../interfaces/Parking';
import { parkingVoiceNotification } from '../parkingSettings/saga';
import { userInfoSelector } from '../userState/selectors';
import { USER_ROLE_DRIVER } from '../userState/reducer';


export function* fetchParkingsSaga() {
  const { lat, lon } = yield select(centerCoordinatesSelector);
  const searchRadius = yield select(searchRadiusSelector);

  const canFetchParkings = searchRadius < MAX_SEARCH_RADIUS_TO_FETCH;
  try {
    if (canFetchParkings) {
      yield put(ParkingsPageActions.fetchParkingsStart());
      const isDriver = (yield select(userInfoSelector)) === USER_ROLE_DRIVER;
      const parkingType = isDriver ? 'free' : 'all';
      const searchQuery = serialize({ lat, lon, radius: searchRadius, type: parkingType });
      const rawResponseParkings: ResponseParkings = yield call(requestToFreeParkingsAPI, `${backendEndpoint}/parkings?${searchQuery}`);
      const preparedResponseParkings: PreparedParkings = prepareParkings(rawResponseParkings);
      yield call(parkingVoiceNotification, preparedResponseParkings);
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

export function* checkForParkingsUpdates() {
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

function* createParkingSaga(preparedParkingParameters: ParkingServerExpects) {
  const url = `${backendEndpoint}/parkings`;
  const createdParking = yield call(requestToFreeParkingsAPI, url, {
    method: 'PUT',
    body: JSON.stringify(preparedParkingParameters),
  });
  return createdParking;
}

function* updateParkingSaga(preparedParkingParameters: ParkingServerExpects) {
  const url = `${backendEndpoint}/parkings/${preparedParkingParameters.id}`;
  yield call(requestToFreeParkingsAPI, url, {
    method: 'PUT',
    body: JSON.stringify(preparedParkingParameters),
  });
  return true;
}

function* postParkingSaga(action: postParkingAttemptAction) {
  const preparedParkingParameters = prepareParkingParametersFromClientToServer(action.payload.parkingCreated);
  try {
    let parking = null;

    if (preparedParkingParameters.id) {
      yield call(updateParkingSaga, preparedParkingParameters);
      parking = preparedParkingParameters;
    } else {
      parking = yield call(createParkingSaga, preparedParkingParameters);
    }
    yield put(postParkingSuccess(parking, action.payload.isFree));
  } catch (e) {
    yield put(postParkingError());
  }
}

function* deleteParkingSaga(action: deleteParkingAction) {
  const parkingId = action.payload;
  const url = `${backendEndpoint}/parkings/${parkingId}`;
  try {
    yield call(requestToFreeParkingsAPI, url, {
      method: 'DELETE',
    })
  } catch (e) {
    console.error('cannot delete parking', e);
  }
}

export default function* defaultParkingsSaga() {
  yield all([
    throttle(3000, parkingsConstants.PARKINGS_REQUEST_FOR_FETCH, fetchParkingsSaga),
    takeEvery(parkingsConstants.CHANGE_CENTER_LOCATION, updateUrlLatLonSaga),
    takeEvery(parkingsConstants.CHECK_PARKINGS_UPDATES_REQUEST, checkForParkingsUpdates),
    takeLatest(parkingsConstants.SYNCHRONIZE_LAT_LON, synchronizeLatLonSaga),
    takeEvery(parkingsConstants.DELETE_PARKING, deleteParkingSaga),
    takeEvery(parkingsConstants.DELETE_ALL_FREE_SLOTS, clearAllFreeSlotsSaga),
    takeEvery(parkingsConstants.DELETE_VISIBLE_FREE_SLOTS, clearVisibleFreeSlotsSaga),
    takeEvery(parkingsConstants.ASK_PERMISSION_FOR_GEO_LOCATION, detectGeoLocationSaga),
    takeEvery(parkingsConstants.POST_PARKING_ATTEMPT, postParkingSaga),
  ]);
}
