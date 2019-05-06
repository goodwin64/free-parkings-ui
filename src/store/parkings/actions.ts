import { action, ActionType } from 'typesafe-actions';

import {
  CHANGE_CENTER_LOCATION,
  CHANGE_ZOOM_LEVEL,
  CHECK_PARKOPEDIA_UPDATES_REQUEST,
  CHECK_PARKOPEDIA_UPDATES_SUCCESS,
  CLEAR_ALL_FREE_SLOTS,
  CLEAR_VISIBLE_FREE_SLOTS,
  ASK_PERMISSION_FOR_GEO_LOCATION,
  PARKINGS_FETCH_START,
  PARKINGS_FETCH_SUCCESS,
  PARKINGS_REQUEST_FOR_FETCH,
  SYNCHRONIZE_LAT_LON,
  POST_PARKING_ATTEMPT,
  POST_PARKING_SUCCESS,
  POST_PARKING_ERROR,
} from './constants';
import { PreparedParkings } from '../../interfaces/ResponseParkings';
import { ParkopediaAvailability } from '../../interfaces/ParkopediaAvailability';
import { ClientParkopediaParking, ParkopediaParking } from '../../interfaces/ParkopediaParking';


export const setParkingsPageCenter = (lat: number, lon: number) => action(CHANGE_CENTER_LOCATION, { lat, lon });
export type setParkingsPageCenterAction = ActionType<typeof setParkingsPageCenter>;
export type setParkingsPageCenterActionCreator = (lat: number, lon: number) => setParkingsPageCenterAction;


export const setZoomLevel = (zoomLevel: number) => action(CHANGE_ZOOM_LEVEL, zoomLevel);
export type setZoomLevelAction = ActionType<typeof setZoomLevel>;
export type setZoomLevelActionCreator = (zoomLevel: number) => setZoomLevelAction;


export const fetchParkingsStart = () => action(PARKINGS_FETCH_START);
export type fetchParkingsStartAction = ActionType<typeof fetchParkingsStart>;
export type fetchParkingsStartActionCreator = () => fetchParkingsStartAction;


export const fetchParkingsRequest = () => action(PARKINGS_REQUEST_FOR_FETCH);
export type fetchParkingsRequestAction = ActionType<typeof fetchParkingsRequest>;
export type fetchParkingsRequestActionCreator = () => fetchParkingsRequestAction;


export const synchronizeLatLon = () => action(SYNCHRONIZE_LAT_LON);
export type synchronizeLatLonAction = ActionType<typeof synchronizeLatLon>;
export type synchronizeLatLonActionCreator = () => synchronizeLatLonAction;


export const fetchParkingsSuccess = (parkings: PreparedParkings) => action(PARKINGS_FETCH_SUCCESS, parkings);
export type fetchParkingsSuccessAction = ActionType<typeof fetchParkingsSuccess>;
export type fetchParkingsSuccessActionCreator = () => fetchParkingsSuccessAction;


export const checkParkopediaUpdatesRequest = () => action(CHECK_PARKOPEDIA_UPDATES_REQUEST);
export type checkParkopediaUpdatesRequestAction = ActionType<typeof checkParkopediaUpdatesRequest>;
export type checkParkopediaUpdatesRequestActionCreator = () => checkParkopediaUpdatesRequestAction;


export const checkParkopediaUpdatesSuccess = (parkopediaAvailability: ParkopediaAvailability) => action(CHECK_PARKOPEDIA_UPDATES_SUCCESS, parkopediaAvailability);
export type checkParkopediaUpdatesSuccessAction = ActionType<typeof checkParkopediaUpdatesSuccess>;
export type checkParkopediaUpdatesSuccessActionCreator = (parkopediaAvailability: ParkopediaAvailability) => checkParkopediaUpdatesSuccessAction;


export const postParkingAttempt = (parkingCreated: ClientParkopediaParking) => action(POST_PARKING_ATTEMPT, parkingCreated);
export type postParkingAttemptAction = ActionType<typeof postParkingAttempt>;
export type postParkingAttemptActionCreator = (parkingCreated: ClientParkopediaParking) => postParkingAttemptAction;


export const postParkingSuccess = (parkingCreated: ParkopediaParking) => action(POST_PARKING_SUCCESS, parkingCreated);
export type postParkingSuccessAction = ActionType<typeof postParkingSuccess>;
export type postParkingSuccessActionCreator = (parkingCreated: ParkopediaParking) => postParkingSuccessAction;


export const postParkingError = () => action(POST_PARKING_ERROR);
export type postParkingErrorAction = ActionType<typeof postParkingError>;
export type postParkingErrorActionCreator = () => postParkingErrorAction;


export const clearAllFreeSlots = () => action(CLEAR_ALL_FREE_SLOTS);
export type clearAllFreeSlotsAction = ActionType<typeof clearAllFreeSlots>;
export type clearAllFreeSlotsActionCreator = () => clearAllFreeSlotsAction;


export const clearVisibleFreeSlots = () => action(CLEAR_VISIBLE_FREE_SLOTS);
export type clearVisibleFreeSlotsAction = ActionType<typeof clearVisibleFreeSlots>;
export type clearVisibleFreeSlotsActionCreator = () => clearVisibleFreeSlotsAction;


export const askPermissionForGeoLocation = () => action(ASK_PERMISSION_FOR_GEO_LOCATION);
export type askPermissionForGeoLocationAction = ActionType<typeof askPermissionForGeoLocation>;
export type askPermissionForGeoLocationActionCreator = () => askPermissionForGeoLocationAction;


export type Actions = setParkingsPageCenterAction
  | setZoomLevelAction
  | fetchParkingsRequestAction
  | fetchParkingsStartAction
  | fetchParkingsSuccessAction
  | checkParkopediaUpdatesRequestAction
  | checkParkopediaUpdatesSuccessAction
  | postParkingAttemptAction
  | postParkingSuccessAction
  | postParkingErrorAction
  | clearAllFreeSlotsAction
  | clearVisibleFreeSlotsAction
  | askPermissionForGeoLocationAction
  ;
