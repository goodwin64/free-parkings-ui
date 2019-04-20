import { select } from 'redux-saga/effects';

import { userAccessTokenSelector } from '../store/userState/selectors';


function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw response;
}

function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

export function request(url: string, options: RequestInit = {}, json: boolean = true) {
  const promise = fetch(url, options).then(checkStatus);
  return json ? promise.then(parseJSON) : promise;
}

export function* requestToFreeParkingsAPI(url: string, options: RequestInit = {}) {
  const accessToken = yield select(userAccessTokenSelector);

  const response = yield fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...accessToken ? {'access_token': accessToken} : {},
    },
  })
    .then(checkStatus)
    .then(parseJSON)
  ;
  return response;
}
