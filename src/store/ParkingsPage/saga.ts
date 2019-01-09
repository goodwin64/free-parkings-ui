import { call, put, select } from 'redux-saga/effects';

import { geoCoordinatesSelector, parkopediaResponseSelector } from './selectors';
import { prepareResponseParkings } from './adapters';
import { searchRadiusSelector } from '../BaseConfig/selectors';
import { ResponseParkings } from '../../interfaces/ResponseParkings';
import * as ParkingsPageActions from './ParkingsPageActions';


async function fetchParkings(lat: number, lon: number, radius: number) {
  return fetch('http://34.247.51.123/area/update', {
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
    const { lat, lon } = yield select(geoCoordinatesSelector);
    const radius = yield select(searchRadiusSelector);

    const rawResponseParkings: ResponseParkings = yield call(fetchParkings, lat, lon, radius);
    const preparedResponseParkings = prepareResponseParkings(rawResponseParkings);

    yield put(ParkingsPageActions.fetchParkingsSuccess(preparedResponseParkings));
  } catch (e) {
    console.error('fetch parkings:', e);
    const mockParkings = yield select(parkopediaResponseSelector);
    const preparedResponseParkings = prepareResponseParkings(mockParkings);
    yield put(ParkingsPageActions.fetchParkingsSuccess(preparedResponseParkings));
  }
}
