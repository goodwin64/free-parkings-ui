import { all } from 'redux-saga/effects';

import defaultParkingsSaga from './parkings/saga';
import defaultLoginPageSaga from './userState/saga';
import defaultCarPageSaga from './car/saga';
import defaultParkingSettingsSaga from './parkingSettings/saga';
import defaultAllUsersSaga from './allUsers/saga';


function* initSaga() {
  yield all([
    defaultParkingsSaga(),
    defaultLoginPageSaga(),
    defaultCarPageSaga(),
    defaultParkingSettingsSaga(),
    defaultAllUsersSaga(),
  ]);
}

export default initSaga;
