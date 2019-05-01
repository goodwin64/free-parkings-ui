import { CarInfo } from '../../interfaces/CarInfo';
import { CarAction } from './actions';
import {
  LOAD_CAR_MANUFACTURERS_SUCCESS,
  LOAD_CAR_PARAMETERS_ATTEMPT,
  LOAD_CAR_PARAMETERS_ERROR,
  LOAD_CAR_PARAMETERS_RESET,
  LOAD_CAR_PARAMETERS_SUCCESS, UPDATE_CAR_PARAMETER_VALUE_ATTEMPT,
} from './constants';


export interface CarPageOwnProps {
  isInProgress: boolean,
  isError: boolean,
  isCached: boolean,
  carManufacturers: string[],
  carInfo: CarInfo,
}

export const carPageInitialState: CarPageOwnProps = {
  isInProgress: false,
  isError: false,
  isCached: false,
  carManufacturers: [],
  carInfo: {},
};

export default function carPageReducer(
  state: CarPageOwnProps = carPageInitialState,
  action: CarAction,
): CarPageOwnProps {
  switch (action.type) {
    case UPDATE_CAR_PARAMETER_VALUE_ATTEMPT: {
      return {
        ...state,
        carInfo: {
          ...state.carInfo,
          [action.payload.paramKey]: action.payload.paramValue,
        }
      };
    }
    case LOAD_CAR_PARAMETERS_ATTEMPT: {
      return {
        ...state,
        isInProgress: true,
        isError: false,
      };
    }
    case LOAD_CAR_PARAMETERS_SUCCESS: {
      return {
        ...state,
        isInProgress: false,
        isError: false,
        isCached: true,
        carInfo: action.payload,
      };
    }
    case LOAD_CAR_PARAMETERS_ERROR: {
      return {
        ...state,
        isInProgress: false,
        isError: true,
      };
    }
    case LOAD_CAR_PARAMETERS_RESET: {
      return carPageInitialState;
    }
    case LOAD_CAR_MANUFACTURERS_SUCCESS: {
      return {
        ...state,
        carManufacturers: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
