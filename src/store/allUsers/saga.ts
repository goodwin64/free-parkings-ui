import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as constants from './constants';
import { UserInfo } from '../../interfaces/UserInfo';
import { backendEndpoint } from '../../constants/backend';
import { loadAllUsersError, loadAllUsersSuccess, setUserRoleError, setUserRoleSuccess } from './actions';
import { requestToFreeParkingsAPI } from '../../services/Authentication.service';


function* loadAllUsersSaga() {
  const url = `${backendEndpoint}/users`;
  try {
    const allUsers: UserInfo[] = yield call(requestToFreeParkingsAPI, url);
    yield put(loadAllUsersSuccess(allUsers));
  } catch(e) {
    yield put(loadAllUsersError());
  }
}

function* setUserRoleSaga(action: actions.setUserRoleAttemptAction) {
  const url = `${backendEndpoint}/users/${action.payload.id}`;
  try {
    yield call(requestToFreeParkingsAPI, url, {
      method: 'POST',
      body: JSON.stringify({ role: action.payload.role }),
    });
    yield put(setUserRoleSuccess(action.payload.id, action.payload.role));
  } catch(e) {
    yield put(setUserRoleError());
  }
}

export default function* defaultAllUsersSaga() {
  yield all([
    takeLatest(constants.LOAD_ALL_USERS_ATTEMPT, loadAllUsersSaga),
    takeLatest(constants.SET_USER_ROLE_ATTEMPT, setUserRoleSaga),
  ]);
}
