import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { carPageIsCachedSelector } from './selectors';
import { requestToFreeParkingsAPI } from '../../services/Authentication.service';
import { backendEndpoint } from '../../constants/backend';
import { userIdSelector } from '../userState/selectors';
import {
  loadCarManufacturersAttempt, loadCarManufacturersError, loadCarManufacturersSuccess,
  loadCarParametersError,
  loadCarParametersSuccess,
  updateCarParameterValueAttemptAction,
  updateCarParameterValueError,
  updateCarParameterValueSuccess,
} from './actions';
import { prepareCarInfo } from './adapters';
import { LOAD_CAR_PARAMETERS_ATTEMPT, UPDATE_CAR_PARAMETER_VALUE_ATTEMPT } from './constants';


function* loadCarDataIfAbsent() {
  const carPageIsCached = yield select(carPageIsCachedSelector);
  const userId = yield select(userIdSelector);
  if (carPageIsCached) {
    return;
  }

  try {
    const rawCarInfo = yield call(requestToFreeParkingsAPI, `${backendEndpoint}/users/${userId}/car`);
    const preparedCarInfo = prepareCarInfo(rawCarInfo);
    yield put(loadCarParametersSuccess(preparedCarInfo));
  } catch(err) {
    yield put(loadCarParametersError());
  }
}

function* updateCarParameterValueSaga(action: updateCarParameterValueAttemptAction) {
  const userId = yield select(userIdSelector);
  try {
    yield call(requestToFreeParkingsAPI, `${backendEndpoint}/users/${userId}/car`, {
      method: 'POST',
      body: JSON.stringify({
        [action.payload.paramKey]: action.payload.paramValue,
      }),
    });
    yield put(updateCarParameterValueSuccess(action.payload));
  } catch(err) {
    yield put(updateCarParameterValueError());
  }
}

function* loadCarManufacturers() {
  try {
    yield put(loadCarManufacturersAttempt());
    const manufacturersList: string[] = yield call(requestToFreeParkingsAPI, `${backendEndpoint}/cars/manufacturers`);
    yield put(loadCarManufacturersSuccess(manufacturersList));
  } catch(err) {
    yield put(loadCarManufacturersError());
  }
}


export default function* defaultCarPageSaga() {
  yield all([
    yield takeLatest(LOAD_CAR_PARAMETERS_ATTEMPT, loadCarDataIfAbsent),
    yield takeLatest(UPDATE_CAR_PARAMETER_VALUE_ATTEMPT, updateCarParameterValueSaga),
    yield call(loadCarManufacturers),
  ]);
};
