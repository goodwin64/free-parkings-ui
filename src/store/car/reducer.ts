import { CarInfo } from '../../interfaces/CarInfo';
import { CarAction } from './actions';
import {
  LOAD_CAR_PARAMETERS_ATTEMPT,
  LOAD_CAR_PARAMETERS_ERROR,
  LOAD_CAR_PARAMETERS_RESET,
  LOAD_CAR_PARAMETERS_SUCCESS,
} from './constants';


export interface CarPageOwnProps {
  isInProgress: boolean,
  isError: boolean,
  isCached: boolean,
  carInfo: CarInfo,
}

export const carPageInitialState: CarPageOwnProps = {
  isInProgress: false,
  isError: false,
  isCached: false,
  carInfo: {},
};

export default function carPageReducer(
  state: CarPageOwnProps = carPageInitialState,
  action: CarAction,
): CarPageOwnProps {
  switch (action.type) {
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
    default: {
      return state;
    }
  }
}
