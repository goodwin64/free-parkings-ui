import { delay } from 'redux-saga';
import { all, call, select, takeLatest } from 'redux-saga/effects';

import * as parkingSettinsConstants from './constants';
import { checkForParkopediaUpdates } from '../parkings/saga';
import { PreparedParkings } from '../../interfaces/ResponseParkings';
import { areVoiceNotificationsEnabledSelector, isParkingAutoSearchEnabledSelector } from './selectors';
import AudioService from '../../services/AudioService';


let checkParkopediaUpdatesTimer: boolean = false;
function* startCheckingParkopediaUpdatesSaga() {
  const isParkingAutoSearchEnabled = yield select(isParkingAutoSearchEnabledSelector);
  checkParkopediaUpdatesTimer = true;
  while (checkParkopediaUpdatesTimer && isParkingAutoSearchEnabled) {
    yield call(checkForParkopediaUpdates);
    yield delay(5000);
  }
}

function stopCheckingParkopediaUpdatesSaga() {
  checkParkopediaUpdatesTimer = false;
}

export function* parkingVoiceNotification(preparedResponseParkings: PreparedParkings) {
  const areVoiceNotificationsEnabled = yield select(areVoiceNotificationsEnabledSelector);
  if (areVoiceNotificationsEnabled && preparedResponseParkings.length > 0) {
    new Audio(AudioService.parkingIsFoundPath).play();
  }
}

export default function* defaultParkingSettingsSaga() {
  yield all([
    takeLatest(parkingSettinsConstants.START_CHECKING_PARKOPEDIA_UPDATES, startCheckingParkopediaUpdatesSaga),
    takeLatest(parkingSettinsConstants.STOP_CHECKING_PARKOPEDIA_UPDATES, stopCheckingParkopediaUpdatesSaga),
  ]);
}
