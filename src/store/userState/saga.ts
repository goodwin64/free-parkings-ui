import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { action } from 'typesafe-actions';

import { backendEndpoint } from '../../constants/backend';
import {
  initUserAuthInfoOnLoad,
  initUserInfoOnLoad,
  signinUserAttemptAction,
  signinUserError,
  signinUserSuccess,
  signupUserAttemptAction,
  signupUserError,
  signupUserSuccess,
  updateAvatarAction,
  updateDefaultCountryAction,
  updateFullnameAction,
  updateGenderAction,
  updateUsernameAction,
  userSignOutSuccess,
} from './actions';
import LocalStorageService, { updateUserInfoLocallySaga } from '../../services/LocalStorage.service';
import {
  USER_SIGN_IN_ATTEMPT,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_ATTEMPT,
  USER_SIGN_OUT_ERROR,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_UP_ATTEMPT,
  USER_SIGN_UP_SUCCESS,
} from '../../containers/App/constants';
import UrlService from '../../services/Url.service';
import { requestToFreeParkingsAPI } from '../../services/Authentication.service';
import { signupErrorAdapter, userInfoAdapter } from './adapters';
import { userAccessTokenSelector, userIdSelector, userInfoSelector } from './selectors';
import { ResponseLoginInfo } from '../../interfaces/ResponseLoginInfo';
import {
  USER_UPDATE_AVATAR,
  USER_UPDATE_DEFAULT_COUNTRY,
  USER_UPDATE_FULLNAME,
  USER_UPDATE_GENDER,
  USER_UPDATE_USERNAME,
} from './constants';
import { loadCarParametersReset } from '../car/actions';
import { UserInfo, UserInfoRequiredForAuth } from '../../interfaces/UserInfo';


function* redirectToPageByRole() {
  const userInfo = yield select(userInfoSelector);
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
    yield put(signinUserSuccess(userInfo));
  } catch (e) {
    yield put(signinUserError());
  }
}

function* signinUserSuccessSaga() {
  yield call(updateUserInfoLocallySaga);
  yield call(redirectToPageByRole);
}

function* signoutUserSuccessSaga() {
  yield put(loadCarParametersReset());
  yield call(LocalStorageService.removeUserInfo);
  yield call(redirectToPageByRole);
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

function* loadUserInfoByAccessToken() {
  const userId = yield select(userIdSelector);

  try {
    const userInfo: UserInfo = yield call(requestToFreeParkingsAPI, `${backendEndpoint}/users/${userId}`);
    yield put(initUserInfoOnLoad(userInfo));
  } catch (e) {
    yield put(userSignOutSuccess());
  }
}

function* initUserInfoOnLoadSaga() {
  const userInfoRequiredForAuth: UserInfoRequiredForAuth | null = yield call(LocalStorageService.getUserInfoRequiredForAuth);

  if (userInfoRequiredForAuth && userInfoRequiredForAuth.accessToken) {
    yield put(initUserAuthInfoOnLoad(userInfoRequiredForAuth));
    yield call(loadUserInfoByAccessToken);
  } else {
    yield call(signoutUserSuccessSaga);
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

function* updatePersonalInfoField(key: string, value: string) {
  const userId = yield select(userIdSelector);
  const url = `${backendEndpoint}/users/${userId}`;

  try {
    yield call(requestToFreeParkingsAPI, url, {
      method: 'POST',
      body: JSON.stringify({ [key]: value }),
    });
    yield call(updateUserInfoLocallySaga);
  } catch (e) {
    console.error(e);
  }
}

function* updateAvatarSaga(action: updateAvatarAction) {
  yield call(updatePersonalInfoField, 'imageUrl', action.payload);
}

function* updateUsernameSaga(action: updateUsernameAction) {
  yield call(updatePersonalInfoField, 'username', action.payload);
}

function* updateFullnameSaga(action: updateFullnameAction) {
  yield call(updatePersonalInfoField, 'fullname', action.payload);
}

function* updateGenderSaga(action: updateGenderAction) {
  yield call(updatePersonalInfoField, 'gender', action.payload);
}

function* updateDefaultCountrySaga(action: updateDefaultCountryAction) {
  yield call(updatePersonalInfoField, 'defaultCountry', action.payload);
}

const defaultLoginPageSaga = function* () {
  yield all([
    takeLatest(USER_SIGN_IN_ATTEMPT, signinUserAttemptSaga),
    takeLatest(USER_SIGN_IN_SUCCESS, signinUserSuccessSaga),
    takeLatest(USER_SIGN_OUT_ATTEMPT, signoutUserAttemptSaga),
    takeLatest(USER_SIGN_OUT_SUCCESS, signoutUserSuccessSaga),
    takeLatest(USER_SIGN_UP_ATTEMPT, signupUserAttemptSaga),
    takeLatest(USER_SIGN_UP_SUCCESS, signupUserSuccessSaga),
    takeLatest(USER_UPDATE_AVATAR, updateAvatarSaga),
    takeLatest(USER_UPDATE_USERNAME, updateUsernameSaga),
    takeLatest(USER_UPDATE_FULLNAME, updateFullnameSaga),
    takeLatest(USER_UPDATE_GENDER, updateGenderSaga),
    takeLatest(USER_UPDATE_DEFAULT_COUNTRY, updateDefaultCountrySaga),
    initUserInfoOnLoadSaga(),
  ]);
};

export default defaultLoginPageSaga;
