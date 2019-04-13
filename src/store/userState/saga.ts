import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { action } from 'typesafe-actions';

import { backendEndpoint } from '../../constants/backend';
import {
  initUserInfoOnLoad,
  signinUserAttemptAction,
  signinUserError,
  signinUserSuccess,
  userSignOutSuccess,
} from './actions';
import LocalStorageService from '../../services/LocalStorage.service';
import {
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_OUT_ATTEMPT,
  USER_SIGN_OUT_ERROR,
} from '../../containers/App/constants';
import UrlService from '../../services/Url.service';
import { UserInfo } from '../../interfaces/UserInfo';
import { request } from '../../services/Authentication.service';
import { userInfoAdapter } from './adapters';
import { userAccessTokenSelector } from './selectors';


function* redirectToPageByRole(userInfo: UserInfo) {
  yield put(push(UrlService.detectPageByUserInfo(userInfo)));
}

function* signinUserAttemptSaga(action: signinUserAttemptAction) {
  const { username, password } = action.payload;
  const url = `${backendEndpoint}/auth/login`;

  try {
    const rawUserInfo: UserInfo = yield call(request, url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userInfo = userInfoAdapter(rawUserInfo);
    yield call(LocalStorageService.setUserInfo, userInfo);
    yield put(signinUserSuccess(userInfo));
    yield call(redirectToPageByRole, userInfo);
  } catch (e) {
    yield put(signinUserError());
  }
}

function* signoutUserSaga() {
  const url = `${backendEndpoint}/auth/logout`;
  const accessToken = yield select(userAccessTokenSelector);
  if (!accessToken) {
    yield put(userSignOutSuccess());
    return;
  }

  try {
    yield call(request, url, {
      method: 'POST',
      body: JSON.stringify({ accessToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(userSignOutSuccess());
  } catch (e) {
    yield put(action(USER_SIGN_OUT_ERROR));
  }

  yield call(LocalStorageService.removeUserInfo);
}

function* initUserInfoOnLoadSaga() {
  const userInfo = yield call(LocalStorageService.getUserInfo);

  if (userInfo && userInfo.accessToken) {
    yield put(initUserInfoOnLoad(userInfo));
  }
}

const defaultLoginPageSaga = function*() {
  yield all([
    takeLatest(USER_SIGN_IN_ATTEMPT, signinUserAttemptSaga),
    takeLatest(USER_SIGN_OUT_ATTEMPT, signoutUserSaga),
  ]);
  yield initUserInfoOnLoadSaga();
};

export default defaultLoginPageSaga;
