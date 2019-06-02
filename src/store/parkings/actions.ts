import { action, ActionType } from 'typesafe-actions';

import {
  ASK_PERMISSION_FOR_GEO_LOCATION,
  CHANGE_CENTER_LOCATION,
  CHANGE_ZOOM_LEVEL,
  CHECK_PARKINGS_UPDATES_REQUEST,
  CHECK_PARKINGS_UPDATES_SUCCESS,
  DELETE_ALL_FREE_SLOTS,
  DELETE_PARKING,
  DELETE_VISIBLE_FREE_SLOTS,
  PARKINGS_FETCH_START,
  PARKINGS_FETCH_SUCCESS,
  PARKINGS_REQUEST_FOR_FETCH,
  POST_PARKING_ATTEMPT,
  POST_PARKING_ERROR,
  POST_PARKING_SUCCESS,
  SYNCHRONIZE_LAT_LON,
} from './constants';
import { PreparedParkings } from '../../interfaces/ResponseParkings';
import { ParkingAvailability } from '../../interfaces/ParkingAvailability';
import { ClientParking, Parking } from '../../interfaces/Parking';


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


export const checkParkingUpdatesRequest = () => action(CHECK_PARKINGS_UPDATES_REQUEST);
export type checkParkingUpdatesRequestAction = ActionType<typeof checkParkingUpdatesRequest>;
export type checkParkingUpdatesRequestActionCreator = () => checkParkingUpdatesRequestAction;


export const checkParkingUpdatesSuccess = (parkingAvailability: ParkingAvailability) => action(CHECK_PARKINGS_UPDATES_SUCCESS, parkingAvailability);
export type checkParkingUpdatesSuccessAction = ActionType<typeof checkParkingUpdatesSuccess>;
export type checkParkingUpdatesSuccessActionCreator = (parkingAvailability: ParkingAvailability) => checkParkingUpdatesSuccessAction;


export const postParkingAttempt = (parkingCreated: ClientParking) => action(POST_PARKING_ATTEMPT, parkingCreated);
export type postParkingAttemptAction = ActionType<typeof postParkingAttempt>;
export type postParkingAttemptActionCreator = (parkingCreated: ClientParking) => postParkingAttemptAction;


export const postParkingSuccess = (parkingCreated: Parking) => action(POST_PARKING_SUCCESS, parkingCreated);
export type postParkingSuccessAction = ActionType<typeof postParkingSuccess>;
export type postParkingSuccessActionCreator = (parkingCreated: Parking) => postParkingSuccessAction;


export const postParkingError = () => action(POST_PARKING_ERROR);
export type postParkingErrorAction = ActionType<typeof postParkingError>;
export type postParkingErrorActionCreator = () => postParkingErrorAction;


export const deleteParking = (parkingId: string) => action(DELETE_PARKING, parkingId);
export type deleteParkingAction = ActionType<typeof deleteParking>;
export type deleteParkingActionCreator = (parkingId: string) => deleteParkingAction;


export const deleteAllFreeSlots = () => action(DELETE_ALL_FREE_SLOTS);
export type deleteAllFreeSlotsAction = ActionType<typeof deleteAllFreeSlots>;
export type deleteAllFreeSlotsActionCreator = () => deleteAllFreeSlotsAction;


export const deleteVisibleFreeSlots = () => action(DELETE_VISIBLE_FREE_SLOTS);
export type deleteVisibleFreeSlotsAction = ActionType<typeof deleteVisibleFreeSlots>;
export type deleteVisibleFreeSlotsActionCreator = () => deleteVisibleFreeSlotsAction;


export const askPermissionForGeoLocation = () => action(ASK_PERMISSION_FOR_GEO_LOCATION);
export type askPermissionForGeoLocationAction = ActionType<typeof askPermissionForGeoLocation>;
export type askPermissionForGeoLocationActionCreator = () => askPermissionForGeoLocationAction;


export type Actions = setParkingsPageCenterAction
  | setZoomLevelAction
  | fetchParkingsRequestAction
  | fetchParkingsStartAction
  | fetchParkingsSuccessAction
  | checkParkingUpdatesRequestAction
  | checkParkingUpdatesSuccessAction
  | postParkingAttemptAction
  | postParkingSuccessAction
  | postParkingErrorAction
  | deleteParkingAction
  | deleteAllFreeSlotsAction
  | deleteVisibleFreeSlotsAction
  | askPermissionForGeoLocationAction
  ;
