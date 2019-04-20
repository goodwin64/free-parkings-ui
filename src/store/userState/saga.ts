import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { action } from 'typesafe-actions';

import { backendEndpoint } from '../../constants/backend';
import {
  initUserInfoOnLoad,
  signinUserAttemptAction,
  signinUserError,
  signinUserSuccess,
  signupUserAttemptAction,
  signupUserError,
  signupUserSuccess,
  userSignOutSuccess,
} from './actions';
import LocalStorageService from '../../services/LocalStorage.service';
import {
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_OUT_ATTEMPT,
  USER_SIGN_OUT_ERROR,
  USER_SIGN_UP_ATTEMPT,
  USER_SIGN_UP_SUCCESS,
} from '../../containers/App/constants';
import UrlService from '../../services/Url.service';
import { UserInfo } from '../../interfaces/UserInfo';
import { requestToFreeParkingsAPI } from '../../services/Authentication.service';
import { signupErrorAdapter, userInfoAdapter } from './adapters';
import { userAccessTokenSelector } from './selectors';
import { ResponseLoginInfo } from '../../interfaces/ResponseLoginInfo';


function* redirectToPageByRole(userInfo: UserInfo) {
  yield put(push(UrlService.detectPageByUserInfo(userInfo)));
}

function* signinUserAttemptSaga(action: signinUserAttemptAction) {
  const { username, password } = action.payload;
  const url = `${backendEndpoint}/auth/login`;

  try {
    const loginInfo: ResponseLoginInfo = yield call(requestToFreeParkingsAPI, url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const userInfo = userInfoAdapter(loginInfo);
    yield call(LocalStorageService.setUserInfo, userInfo);
    yield put(signinUserSuccess(userInfo));
    yield call(redirectToPageByRole, userInfo);
  } catch (e) {
    yield put(signinUserError());
  }
}

function* signoutUserAttemptSaga() {
  const url = `${backendEndpoint}/auth/logout`;
  const accessToken = yield select(userAccessTokenSelector);
  if (!accessToken) {
    yield put(userSignOutSuccess());
    return;
  }

  try {
    yield call(requestToFreeParkingsAPI, url, {
      method: 'POST',
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

function* signupUserAttemptSaga(action: signupUserAttemptAction) {
  const { username, password } = action.payload;
  const url = `${backendEndpoint}/auth/signup`;

  try {
    yield call(requestToFreeParkingsAPI, url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    yield put(signupUserSuccess());
  } catch (e) {
    const errorData = yield e.json();
    const errorMessage = signupErrorAdapter(errorData);
    yield put(signupUserError(errorMessage));
  }
}

function* signupUserSuccessSaga() {
  alert('signed up successfully');
  yield put(push(UrlService.loginPageUrl));
}

const defaultLoginPageSaga = function*() {
  yield all([
    takeLatest(USER_SIGN_IN_ATTEMPT, signinUserAttemptSaga),
    takeLatest(USER_SIGN_OUT_ATTEMPT, signoutUserAttemptSaga),
    takeLatest(USER_SIGN_UP_ATTEMPT, signupUserAttemptSaga),
    takeLatest(USER_SIGN_UP_SUCCESS, signupUserSuccessSaga),
  ]);
  yield initUserInfoOnLoadSaga();
};

export default defaultLoginPageSaga;
