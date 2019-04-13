import { all } from 'redux-saga/effects';

import defaultParkingsSaga from './parkings/saga';
import defaultLoginPageSaga from './userState/saga';


function* initSaga() {
  yield all([
    defaultParkingsSaga(),
    defaultLoginPageSaga(),
  ]);
}

export default initSaga;
