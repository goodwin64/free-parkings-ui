import { takeEvery, takeLatest, throttle } from 'redux-saga/effects';

import {
  fetchParkingsSaga,
  synchronizeLatLonSaga,
  updateUrlLatLonSaga,
} from '../containers/ParkingsPage/saga';
import {
  CHANGE_CENTER_LOCATION,
  PARKINGS_REQUEST_FOR_FETCH,
  SYNCHRONIZE_LAT_LON,
} from '../containers/ParkingsPage/ParkingsPageConstants';


function* initSaga() {
  yield throttle(3000, PARKINGS_REQUEST_FOR_FETCH, fetchParkingsSaga);
  yield takeEvery(CHANGE_CENTER_LOCATION, updateUrlLatLonSaga);
  yield takeLatest(SYNCHRONIZE_LAT_LON, synchronizeLatLonSaga);
}

export default initSaga;
