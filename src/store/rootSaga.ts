import { call, put, takeLatest } from 'redux-saga/effects'

import { setBaseConfigRadiusAction } from './BaseConfig/BaseConfigActions';
import { BASE_CONFIG_RADIUS_SET } from './BaseConfig/BaseConfigConstants';


// replace with real fetch
const TestAsyncChanger = {
  setRadius: function(radius: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(radius), 1500);
    })
      .then(console.log)
      .catch(e => ({ message: `err: ${e}` }))
  }
};

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* setRadiusSaga(action: setBaseConfigRadiusAction) {
  try {
    const radius = yield call(TestAsyncChanger.setRadius, action.payload);
    yield put({type: BASE_CONFIG_RADIUS_SET, user: radius});
  } catch (e) {
    console.error('cannot set config', e.message)
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* initSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", setRadiusSaga);
}

export default initSaga;
