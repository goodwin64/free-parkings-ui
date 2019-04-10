import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { backendEndpoint } from '../../constants/backend';
import { initUserInfoOnLoad, signinUserAttemptAction, signinUserError, signinUserSuccess } from './actions';
import LocalStorageService from '../../services/LocalStorage.service';
import { USER_SIGN_IN_ATTEMPT, USER_SIGN_OUT } from '../../containers/App/constants';
import UrlService from '../../services/Url.service';
import { UserInfo } from '../../interfaces/UserInfo';
import { request } from '../../services/Authentication.service';
import { userInfoAdapter } from './adapters';


function* redirectToPageByRole(userInfo: UserInfo) {
  yield put(push(UrlService.detectPageByUserInfo(userInfo)));
}

function* signinUserAttemptSaga(action: signinUserAttemptAction) {
  const { username, password } = action.payload;
  const url = `${backendEndpoint}/auth`;

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
  yield call(LocalStorageService.removeUserInfo);
}

function* initUserInfoOnLoadSaga() {
  const userInfo = yield call(LocalStorageService.getUserInfo);

  if (userInfo) {
    yield put(initUserInfoOnLoad(userInfo));
  }
}

const defaultLoginPageSaga = function*() {
  yield all([
    takeLatest(USER_SIGN_IN_ATTEMPT, signinUserAttemptSaga),
    takeLatest(USER_SIGN_OUT, signoutUserSaga),
  ]);
  yield initUserInfoOnLoadSaga();
};

export default defaultLoginPageSaga;
