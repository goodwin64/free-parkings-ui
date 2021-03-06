import { action, ActionType } from 'typesafe-actions';

import {
  LOAD_CAR_MANUFACTURERS_ATTEMPT, LOAD_CAR_MANUFACTURERS_ERROR, LOAD_CAR_MANUFACTURERS_SUCCESS,
  LOAD_CAR_PARAMETERS_ATTEMPT,
  LOAD_CAR_PARAMETERS_ERROR,
  LOAD_CAR_PARAMETERS_RESET,
  LOAD_CAR_PARAMETERS_SUCCESS,
  UPDATE_CAR_PARAMETER_VALUE_ATTEMPT,
  UPDATE_CAR_PARAMETER_VALUE_ERROR,
  UPDATE_CAR_PARAMETER_VALUE_SUCCESS,
} from './constants';
import { CarInfo } from '../../interfaces/CarInfo';


export const loadCarParametersAttempt = () => action(LOAD_CAR_PARAMETERS_ATTEMPT);
export type loadCarParametersAttemptAction = ActionType<typeof loadCarParametersAttempt>;
export type loadCarParametersAttemptActionCreator = () => loadCarParametersAttemptAction;

export const loadCarParametersSuccess = (carInfo: CarInfo) => action(LOAD_CAR_PARAMETERS_SUCCESS, carInfo);
export type loadCarParametersSuccessAction = ActionType<typeof loadCarParametersSuccess>;
export type loadCarParametersSuccessActionCreator = (carInfo: CarInfo) => loadCarParametersSuccessAction;

export const loadCarParametersError = () => action(LOAD_CAR_PARAMETERS_ERROR);
export type loadCarParametersErrorAction = ActionType<typeof loadCarParametersError>;
export type loadCarParametersErrorActionCreator = () => loadCarParametersErrorAction;

export const loadCarParametersReset = () => action(LOAD_CAR_PARAMETERS_RESET);
export type loadCarParametersResetAction = ActionType<typeof loadCarParametersReset>;
export type loadCarParametersResetActionCreator = () => loadCarParametersResetAction;

export const updateCarParameterValueAttempt = (paramKey: string, paramValue?: string | number) => action(UPDATE_CAR_PARAMETER_VALUE_ATTEMPT, { paramKey, paramValue });
export type updateCarParameterValueAttemptAction = ActionType<typeof updateCarParameterValueAttempt>;
export type updateCarParameterValueAttemptActionCreator = (paramKey: string, paramValue?: string | number) => updateCarParameterValueAttemptAction;

export const updateCarParameterValueSuccess = ({ paramKey, paramValue }: { paramKey: string, paramValue?: string | number }) => action(UPDATE_CAR_PARAMETER_VALUE_SUCCESS, { paramKey, paramValue });
export type updateCarParameterValueSuccessAction = ActionType<typeof updateCarParameterValueSuccess>;
export type updateCarParameterValueSuccessActionCreator = ({ paramKey, paramValue }: { paramKey: string, paramValue?: string | number }) => updateCarParameterValueSuccessAction;

export const updateCarParameterValueError = () => action(UPDATE_CAR_PARAMETER_VALUE_ERROR);
export type updateCarParameterValueErrorAction = ActionType<typeof updateCarParameterValueError>;
export type updateCarParameterValueErrorActionCreator = () => updateCarParameterValueErrorAction;

export const loadCarManufacturersAttempt = () => action(LOAD_CAR_MANUFACTURERS_ATTEMPT);
export type loadCarManufacturersAttemptAction = ActionType<typeof loadCarManufacturersAttempt>;
export type loadCarManufacturersAttemptActionCreator = () => loadCarManufacturersAttemptAction;

export const loadCarManufacturersSuccess = (manufacturersList: string[]) => action(LOAD_CAR_MANUFACTURERS_SUCCESS, manufacturersList);
export type loadCarManufacturersSuccessAction = ActionType<typeof loadCarManufacturersSuccess>;
export type loadCarManufacturersSuccessActionCreator = (manufacturersList: string[]) => loadCarManufacturersSuccessAction;

export const loadCarManufacturersError = () => action(LOAD_CAR_MANUFACTURERS_ERROR);
export type loadCarManufacturersErrorAction = ActionType<typeof loadCarManufacturersError>;
export type loadCarManufacturersErrorActionCreator = () => loadCarManufacturersErrorAction;

export type CarAction = loadCarParametersAttemptAction
  | loadCarParametersSuccessAction
  | loadCarParametersErrorAction
  | loadCarParametersResetAction
  | updateCarParameterValueAttemptAction
  | updateCarParameterValueSuccessAction
  | updateCarParameterValueErrorAction
  | loadCarManufacturersAttemptAction
  | loadCarManufacturersSuccessAction
  | loadCarManufacturersErrorAction
;
