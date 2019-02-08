import { push } from 'connected-react-router';
import { call, put, select } from 'redux-saga/effects';

import {
  centerCoordinatesSelector,
  geoCoordinatesSelector,
  lastParkingsCheckTimestampSelector,
} from './ParkingsPageSelectors';
import { prepareParkings } from './adapters';
import { searchRadiusSelector, sessionUidSelector } from '../BaseConfigPage/selectors';
import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';
import * as ParkingsPageActions from './ParkingsPageActions';
import {
  checkParkopediaUpdatesSuccess,
  fetchParkingsRequest,
  setParkingsPageCenter,
} from './ParkingsPageActions';
import { backendEndpoint } from '../../constants/backend';
import { MAX_SEARCH_RADIUS_TO_FETCH } from '../BaseConfigPage/BaseConfigConstants';
import serialize from '../../utils/serialize';
import { ResponseParkopediaAvailability } from '../../interfaces/ResponseParkopediaAvailability';


async function fetchParkings(lat: number, lon: number, radius: number, uid: string) {
  return fetch(`${backendEndpoint}/area/update`, {
    method: 'POST',
    body: JSON.stringify({ lat, lon, radius, uid }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
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
    const url = `/parkings?lat=${action.payload.lat}&lon=${action.payload.lon}`;
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

export function* clearFreeSlotsSaga() {
  try {
    yield call(fetch, `${backendEndpoint}/admin/cloudevents/drop`, {
      method: 'POST',
    });
  } catch (e) {
    console.error('Failed to clear free slots');
  }
}
