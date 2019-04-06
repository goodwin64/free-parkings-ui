// import LocalStorageService from './LocalStorage.service';
import { USER_ROLE_GUEST, UserAuthInfo } from '../interfaces/UserAuthInfo';


export const defaultUserAuthInfo: UserAuthInfo = {
  role: USER_ROLE_GUEST,
};

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(`Response with error: ${response.status}`);
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

// type responseWithAuthSuccess = any;
// type responseWithAuthFailure = { error: any };
// type responseWithAuth = responseWithAuthSuccess | responseWithAuthFailure;
//
// export async function requestWithAuthInfo(
//   { url, options = {}, json = true }: { url: string, options?: RequestInit, json: boolean }
// ): responseWithAuth {
//   const userAuthInfo: UserAuthInfo = LocalStorageService.getAuthInfo();
//   const { accessToken, role } = userAuthInfo;
//   if (role === USER_ROLE_GUEST || !accessToken) {
//     // yield put(notAllowedWithGuestPermission());
//     return {
//       error: 'not allowed, guest permission'
//     }
//   }
//
//   try {
//     const authOptionsHeaders = {
//       Authorization: `Bearer ${accessToken}`,
//     };
//     const optionsCombined = {
//       ...options,
//       headers: {
//         ...authOptionsHeaders,
//         ...options.headers,
//       },
//     };
//     return await request({
//       url,
//       options: optionsCombined,
//       json,
//     });
//   } catch (e) {
//     // Throw for errors that are not linked with auth
//     if (e.message !== '401' && e.message !== '403') {
//       throw e;
//     }
//     // Handling for auth related errors
//     // yield put(userSignOut());
//     console.error('userSignOut');
//   }
// }
