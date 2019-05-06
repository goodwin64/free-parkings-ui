import { all } from 'redux-saga/effects';

import defaultParkingsSaga from './parkings/saga';
import defaultLoginPageSaga from './userState/saga';
import defaultCarPageSaga from './car/saga';
import defaultParkingSettingsSaga from './parkingSettings/saga';


function* initSaga() {
  yield all([
    defaultParkingsSaga(),
    defaultLoginPageSaga(),
    defaultCarPageSaga(),
    defaultParkingSettingsSaga(),
  ]);
}

export default initSaga;
