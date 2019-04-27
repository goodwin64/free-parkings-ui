import { all } from 'redux-saga/effects';

import defaultParkingsSaga from './parkings/saga';
import defaultLoginPageSaga from './userState/saga';
import defaultCarPageSaga from './car/saga';


function* initSaga() {
  yield all([
    defaultParkingsSaga(),
    defaultLoginPageSaga(),
    defaultCarPageSaga(),
  ]);
}

export default initSaga;
