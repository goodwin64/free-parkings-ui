import { action, ActionType } from 'typesafe-actions';

import {
  CHANGE_CENTER_LOCATION,
  PARKINGS_REQUEST_FOR_FETCH,
  PARKINGS_FETCH_SUCCESS,
  SYNCHRONIZE_LAT_LON,
  PARKINGS_FETCH_START,
} from './ParkingsPageConstants';
import { PreparedParkings } from '../../interfaces/ResponseParkings';


export const setParkingsPageCenter = (lat: number, lon: number) => action(CHANGE_CENTER_LOCATION, { lat, lon });
export type setParkingsPageCenterAction = ActionType<typeof setParkingsPageCenter>;
export type setParkingsPageCenterActionCreator = (lat: number, lon: number) => setParkingsPageCenterAction;


export const fetchParkingsStart = () => action(PARKINGS_FETCH_START);
export type fetchParkingsStartAction = ActionType<typeof fetchParkingsStart>;
export type fetchParkingsStartActionCreator = () => fetchParkingsStartAction;


export const fetchParkingsRequest = () => action(PARKINGS_REQUEST_FOR_FETCH);
export type fetchParkingsRequestAction = ActionType<typeof fetchParkingsRequest>;
export type fetchParkingsRequestActionCreator = () => fetchParkingsRequestAction;


export const synchronizeLatLon = () => action(SYNCHRONIZE_LAT_LON);
export type synchronizeLatLonAction = ActionType<typeof synchronizeLatLon>;
export type synchronizeLatLonActionCreator = () => synchronizeLatLonAction;


export const fetchParkingsSuccess = (parkings: PreparedParkings) => action(PARKINGS_FETCH_SUCCESS, { parkings });
export type fetchParkingsSuccessAction = ActionType<typeof fetchParkingsSuccess>;
export type fetchParkingsSuccessActionCreator = () => fetchParkingsSuccessAction;


export type ParkingsPageActions = setParkingsPageCenterAction
  | fetchParkingsRequestAction
  | fetchParkingsStartAction
  | fetchParkingsSuccessAction;
