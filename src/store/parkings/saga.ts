import { push } from 'connected-react-router';
import { all, call, put, select, takeEvery, takeLatest, throttle } from 'redux-saga/effects';

import {
  centerCoordinatesSelector,
  geoCoordinatesSelector,
  lastParkingsCheckTimestampSelector,
} from './selectors';
import { prepareParkings } from './adapters';
import { searchRadiusSelector, sessionUidSelector } from '../../containers/BaseConfigPage/BaseConfigSelectors';
import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';
import * as ParkingsPageActions from './actions';
import {
  checkParkopediaUpdatesSuccess,
  fetchParkingsRequest,
  setParkingsPageCenter,
} from './actions';
import { backendEndpoint } from '../../constants/backend';
import { MAX_SEARCH_RADIUS_TO_FETCH } from '../../containers/BaseConfigPage/BaseConfigConstants';
import serialize from '../../utils/serialize';
import { ResponseParkopediaAvailability } from '../../interfaces/ResponseParkopediaAvailability';
import UrlService from '../../services/Url.service';
import * as parkingsConstants from './constants';


async function fetchParkings(lat: number, lon: number, radius: number, uid: string) {
  return fetch(`${backendEndpoint}/parkings`)
    .then((response) => response.json());
}

async function fetchParkopediaParkingsAvailability(url: string) {
  return fetch(url)
    .then((response) => response.json());
}

export function* fetchParkingsSaga() {
  const { lat, lon } = yield select(centerCoordinatesSelector);
  const searchRadius = yield select(searchRadiusSelector);
  const uid = yield select(sessionUidSelector);

  let preparedResponseParkings: PreparedParkings;
  const canFetchParkings = searchRadius < MAX_SEARCH_RADIUS_TO_FETCH;
  try {
    if (canFetchParkings) {
      const rawResponseParkings: ResponseParkings = yield call(fetchParkings, lat, lon, searchRadius, uid);
      preparedResponseParkings = prepareParkings(rawResponseParkings);
      yield put(ParkingsPageActions.fetchParkingsStart());
    } else {
      preparedResponseParkings = prepareParkings();
    }
  } catch (e) {
    console.error('fetch parkings:', e);
    preparedResponseParkings = prepareParkings();
  }

  yield put(ParkingsPageActions.fetchParkingsSuccess(preparedResponseParkings));
}

export function* updateUrlLatLonSaga(action: ParkingsPageActions.setParkingsPageCenterAction) {
  try {
    const url = `${UrlService.findParkingsPageUrl}?lat=${action.payload.lat}&lon=${action.payload.lon}`;
    yield put(push(url));
  } catch (err) {
    console.error(err);
  }
}

export function* synchronizeLatLonSaga() {
  const { lat: latFromUrl, lon: lonFromUrl } = yield select(geoCoordinatesSelector);
  yield put(setParkingsPageCenter(latFromUrl, lonFromUrl));
}

export function* checkForParkopediaUpdates() {
  const { lat, lon } = yield select(centerCoordinatesSelector);
  const radius = yield select(searchRadiusSelector);
  const lastParkingsCheckTimestamp = yield select(lastParkingsCheckTimestampSelector);

  let updatesCount: number = 0;
  const queryOptions = serialize({ lat, lon, radius, timestamp: lastParkingsCheckTimestamp });
  const url = `${backendEndpoint}/area/checkUpdates?${queryOptions}`;
  try {
    const {
      updates,
      timestamp,
    }: ResponseParkopediaAvailability = yield call(fetchParkopediaParkingsAvailability, url);
    updatesCount = updates;
    yield put(checkParkopediaUpdatesSuccess({
      timestamp,
      updatesCount: updates,
    }));
  } catch (e) {
    console.error('Failed to detect whether there are Parkopedia updates');
  }

  if (updatesCount > 0) {
    yield put(fetchParkingsRequest());
  }
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

export default function* defaultParkingsSaga() {
  yield all([
    throttle(3000, parkingsConstants.PARKINGS_REQUEST_FOR_FETCH, fetchParkingsSaga),
    takeEvery(parkingsConstants.CHANGE_CENTER_LOCATION, updateUrlLatLonSaga),
    takeEvery(parkingsConstants.CHECK_PARKOPEDIA_UPDATES_REQUEST, checkForParkopediaUpdates),
    takeLatest(parkingsConstants.SYNCHRONIZE_LAT_LON, synchronizeLatLonSaga),
    takeEvery(parkingsConstants.CLEAR_ALL_FREE_SLOTS, clearAllFreeSlotsSaga),
    takeEvery(parkingsConstants.CLEAR_VISIBLE_FREE_SLOTS, clearVisibleFreeSlotsSaga),
  ]);
}
