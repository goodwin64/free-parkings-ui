import { push } from 'connected-react-router';
import { call, put, select } from 'redux-saga/effects';

import { centerCoordinatesSelector, geoCoordinatesSelector, parkopediaResponseSelector } from './ParkingsPageSelectors';
import { prepareResponseParkings } from './adapters';
import { searchRadiusSelector, sessionUidSelector } from '../BaseConfigPage/selectors';
import { ResponseParkings } from '../../interfaces/ResponseParkings';
import * as ParkingsPageActions from './ParkingsPageActions';
import { setParkingsPageCenter } from './ParkingsPageActions';
import { backendEndpoint } from '../../constants/backend';
import { MAX_SEARCH_RADIUS_TO_FETCH } from '../BaseConfigPage/BaseConfigConstants';
import getMockedFreeSlots from './getMockedFreeSlots';


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

export function* fetchParkingsSaga() {
  const { lat, lon } = yield select(centerCoordinatesSelector);
  const radius = yield select(searchRadiusSelector);
    const uid = yield select(sessionUidSelector);

  let preparedResponseParkings;
  try {
    if (radius > MAX_SEARCH_RADIUS_TO_FETCH) {
      preparedResponseParkings = prepareResponseParkings();
    } else {
      const rawResponseParkings: ResponseParkings = yield call(fetchParkings, lat, lon, radius, uid);
      preparedResponseParkings = prepareResponseParkings(rawResponseParkings);
    }
  } catch (e) {
    console.error('fetch parkings:', e);
    const mockParkings = yield select(parkopediaResponseSelector);
    preparedResponseParkings = prepareResponseParkings(mockParkings);
  }

  preparedResponseParkings.freeSlots = getMockedFreeSlots();
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
