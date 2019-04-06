import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import identity from 'lodash/identity';

import { backendEndpoint } from '../../constants/backend';
import { signinUserAttemptAction, signinUserError, signinUserSuccess } from './LoginPageActions';
import LocalStorageService from '../../services/LocalStorage.service';
import { USER_SIGN_IN_ATTEMPT } from '../App/constants';
import UrlService from '../../services/Url.service';
import { USER_ROLE_ADMIN, USER_ROLE_DRIVER, USER_ROLE_GUEST, UserAuthInfo } from '../../interfaces/UserAuthInfo';
import { request } from '../../services/Authentication.service';


const adapter = identity;

export function* redirectToPageByRole(userAuthInfo: UserAuthInfo) {
  if (userAuthInfo.role === USER_ROLE_GUEST) {
    yield put(push(UrlService.loginPageUrl));
  } else if (userAuthInfo.role === USER_ROLE_ADMIN) {
    yield put(push(UrlService.adminDashboardPageUrl));
  } else if (userAuthInfo.role === USER_ROLE_DRIVER) {
    yield put(push(UrlService.driverPageUrl));
  }
}

export function* signinUserAttemptSaga(action: signinUserAttemptAction) {
  console.log('signinUserAttemptSaga');
  const { email, password } = action.payload;
  const url = `${backendEndpoint}/auth`;

  try {
    const rawUserAuthInfo: UserAuthInfo = yield call(request, url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('rawUserAuthInfo', rawUserAuthInfo);
    const userAuthInfo = adapter(rawUserAuthInfo);
    yield call(LocalStorageService.setAuthInfo, userAuthInfo);
    yield put(signinUserSuccess(userAuthInfo));
    yield call(redirectToPageByRole, userAuthInfo);
  } catch (e) {
    yield put(signinUserError());
  }
}

const loginPageSagas = [
  takeLatest(USER_SIGN_IN_ATTEMPT, signinUserAttemptSaga),
];

export default loginPageSagas;
