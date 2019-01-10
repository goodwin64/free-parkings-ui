import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { fetchParkingsSaga, updateUrlLatLon } from '../containers/ParkingsPage/saga';
import { CHANGE_CENTER_LOCATION, PARKINGS_FETCH_START } from '../containers/ParkingsPage/ParkingsPageConstants';
import { geoCoordinatesSelector } from '../containers/ParkingsPage/selectors';
import { setParkingsPageCenter } from '../containers/ParkingsPage/ParkingsPageActions';


function* initStoreCoordinatesFromUrl() {
  const { lat: latFromUrl, lon: lonFromUrl } = yield select(geoCoordinatesSelector);
  return setParkingsPageCenter(latFromUrl, lonFromUrl);
}

function* initSaga() {
  yield takeLatest(PARKINGS_FETCH_START, fetchParkingsSaga);
  yield takeEvery(CHANGE_CENTER_LOCATION, updateUrlLatLon);

  yield put(yield initStoreCoordinatesFromUrl());
}

export default initSaga;
