import { call, takeLatest } from 'redux-saga/effects';

import { SIGNIN_USER } from './constants';
import { backendEndpoint } from '../../constants/backend';
import { signinUserAction } from './LoginPageActions';


export function* signinUserSaga(action: signinUserAction) {
  const { email, password } = action.payload;
  try {
    yield call(fetch, `${backendEndpoint}/auth`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error('Failed to auth');
  }
}

const loginPageSagas = [
  takeLatest(SIGNIN_USER, signinUserSaga),
];

export default loginPageSagas;
