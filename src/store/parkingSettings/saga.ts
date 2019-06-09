import some from 'lodash/some';
import { delay } from 'redux-saga';
import { all, call, select, takeLatest } from 'redux-saga/effects';

import * as parkingSettinsConstants from './constants';
import { checkForParkingsUpdates } from '../parkings/saga';
import { PreparedParkings } from '../../interfaces/ResponseParkings';
import { Parking } from '../../interfaces/Parking';
import * as parkingsSelectors from '../parkings/selectors';
import { areVoiceNotificationsEnabledSelector, isParkingAutoSearchEnabledSelector } from './selectors';
import AudioService from '../../services/AudioService';


let checkParkingUpdatesTimer: boolean = false;
function* startCheckingParkingUpdatesSaga() {
  const isParkingAutoSearchEnabled = yield select(isParkingAutoSearchEnabledSelector);
  checkParkingUpdatesTimer = true;
  while (checkParkingUpdatesTimer && isParkingAutoSearchEnabled) {
    yield call(checkForParkingsUpdates);
    yield delay(5000);
  }
}

function stopCheckingParkingUpdatesSaga() {
  checkParkingUpdatesTimer = false;
}

export function* parkingVoiceNotification(preparedResponseParkings: PreparedParkings) {
  const areVoiceNotificationsEnabled = yield select(areVoiceNotificationsEnabledSelector);
  const existingParkings: Parking[] = yield select(parkingsSelectors.allParkingsSelector);
  const areThereNewParkings = some(preparedResponseParkings, ({ id }) => existingParkings.every(p => p.id !== id));
  if (areVoiceNotificationsEnabled && areThereNewParkings) {
    new Audio(AudioService.parkingIsFoundPath).play();
  }
}

export default function* defaultParkingSettingsSaga() {
  yield all([
    takeLatest(parkingSettinsConstants.START_CHECKING_PARKING_UPDATES, startCheckingParkingUpdatesSaga),
    takeLatest(parkingSettinsConstants.STOP_CHECKING_PARKING_UPDATES, stopCheckingParkingUpdatesSaga),
  ]);
}
