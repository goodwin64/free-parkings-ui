import { action, ActionType } from 'typesafe-actions';

import { CHANGE_CENTER_LOCATION, PARKINGS_FETCH_START, PARKINGS_FETCH_SUCCESS } from './ParkingsPageConstants';
import { ResponseParkings } from '../../interfaces/ResponseParkings';


export const setParkingsPageCenter = (lat: number, lon: number) =>
  action(CHANGE_CENTER_LOCATION, {
    lat,
    lon,
  });
export type setParkingsPageCenterAction = ActionType<typeof setParkingsPageCenter>;
export type setParkingsPageCenterActionCreator = (lat: number, lon: number) => setParkingsPageCenterAction;


export const fetchParkings = () => action(PARKINGS_FETCH_START);
export type fetchParkingsAction = ActionType<typeof fetchParkings>;
export type fetchParkingsActionCreator = () => fetchParkingsAction;


export const fetchParkingsSuccess = (parkings: ResponseParkings) =>
  action(PARKINGS_FETCH_SUCCESS, {
    parkings
  });
export type fetchParkingsSuccessAction = ActionType<typeof fetchParkingsSuccess>;
// export type fetchParkingsSuccessActionCreator = () => fetchParkingsSuccessAction;


export type ParkingsPageActions = setParkingsPageCenterAction | fetchParkingsAction | fetchParkingsSuccessAction;
