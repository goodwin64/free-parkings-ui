import { push } from 'connected-react-router';
import { call, put, select } from 'redux-saga/effects';

import { centerCoordinatesSelector, geoCoordinatesSelector, parkopediaResponseSelector } from './ParkingsPageSelectors';
import { prepareResponseParkings } from './adapters';
import { searchRadiusSelector } from '../BaseConfigPage/selectors';
import { ResponseParkings } from '../../interfaces/ResponseParkings';
import * as ParkingsPageActions from './ParkingsPageActions';
import { setParkingsPageCenter } from './ParkingsPageActions';
import { backendEndpoint } from '../../constants/backend';
import { MAX_SEARCH_RADIUS_TO_FETCH } from '../BaseConfigPage/BaseConfigConstants';


async function fetchParkings(lat: number, lon: number, radius: number) {
  return fetch(`${backendEndpoint}/area/update`, {
    method: 'POST',
    body: JSON.stringify({ lat, lon, radius }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
}

export function* fetchParkingsSaga() {
  try {
    const { lat, lon } = yield select(centerCoordinatesSelector);
    const radius = yield select(searchRadiusSelector);

    let preparedResponseParkings;
    if (radius > MAX_SEARCH_RADIUS_TO_FETCH) {
      preparedResponseParkings = prepareResponseParkings();
    } else {
      const rawResponseParkings: ResponseParkings = yield call(fetchParkings, lat, lon, radius);
      preparedResponseParkings = prepareResponseParkings(rawResponseParkings);
    }

    yield put(ParkingsPageActions.fetchParkingsSuccess(preparedResponseParkings));
  } catch (e) {
    console.error('fetch parkings:', e);
    const mockParkings = yield select(parkopediaResponseSelector);
    const preparedResponseParkings = prepareResponseParkings(mockParkings);
    yield put(ParkingsPageActions.fetchParkingsSuccess(preparedResponseParkings));
  }
}

export function* updateUrlLatLonSaga(action: ParkingsPageActions.setParkingsPageCenterAction) {
  try {
    const url = `/parkings?lat=${action.payload.lat}&lon=${action.payload.lon}`;
    yield put(push(url));
    yield call(fetchParkingsSaga);
  } catch (err) {
    console.error(err);
  }
}

export function* synchronizeLatLonSaga() {
  const { lat: latFromUrl, lon: lonFromUrl } = yield select(geoCoordinatesSelector);
  yield put(setParkingsPageCenter(latFromUrl, lonFromUrl));
}
