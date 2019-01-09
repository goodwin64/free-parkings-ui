import { takeLatest } from 'redux-saga/effects';

import { fetchParkingsSaga } from './ParkingsPage/saga';
import { CHANGE_CENTER_LOCATION, PARKINGS_FETCH_START } from './ParkingsPage/ParkingsPageConstants';


function* initSaga() {
  yield takeLatest(PARKINGS_FETCH_START, fetchParkingsSaga);
  yield takeLatest(CHANGE_CENTER_LOCATION, fetchParkingsSaga);
}

export default initSaga;
