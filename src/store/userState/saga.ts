import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import identity from 'lodash/identity';

import { backendEndpoint } from '../../constants/backend';
import { signinUserAttemptAction, signinUserError, signinUserSuccess } from './actions';
import LocalStorageService from '../../services/LocalStorage.service';
import { USER_SIGN_IN_ATTEMPT, USER_SIGN_OUT } from '../../containers/App/constants';
import UrlService from '../../services/Url.service';
import { UserAuthInfo } from '../../interfaces/UserAuthInfo';
import { request } from '../../services/Authentication.service';
import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST } from './reducer';


const adapter = identity;

function* redirectToPageByRole(userAuthInfo: UserAuthInfo) {
  if (!userAuthInfo.role || userAuthInfo.role === USER_ROLE_GUEST) {
    yield put(push(UrlService.loginPageUrl));
  } else if (userAuthInfo.role === USER_ROLE_ADMIN) {
    yield put(push(UrlService.adminDashboardPageUrl));
  } else if (userAuthInfo.role === USER_ROLE_DRIVER) {
    yield put(push(UrlService.driverPageUrl));
  }
}

function* signinUserAttemptSaga(action: signinUserAttemptAction) {
  const { username, password } = action.payload;
  const url = `${backendEndpoint}/auth`;

  try {
    const rawUserAuthInfo: UserAuthInfo = yield call(request, url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userAuthInfo = adapter(rawUserAuthInfo);
    yield call(LocalStorageService.setAuthInfo, userAuthInfo);
    yield put(signinUserSuccess(userAuthInfo));
    yield call(redirectToPageByRole, userAuthInfo);
  } catch (e) {
    yield put(signinUserError());
  }
}

function* signoutUserSaga() {
  yield call(LocalStorageService.removeAuthInfo);
}

const loginPageSagas = [
  takeLatest(USER_SIGN_IN_ATTEMPT, signinUserAttemptSaga),
  takeLatest(USER_SIGN_OUT, signoutUserSaga),
];

export default loginPageSagas;
