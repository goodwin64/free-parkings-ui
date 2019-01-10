import { CHANGE_CENTER_LOCATION, PARKINGS_FETCH_START, PARKINGS_FETCH_SUCCESS } from './ParkingsPageConstants';
import { ParkingsPageActions } from './ParkingsPageActions';
import { BaseConfigInitialState } from '../BaseConfigPage/BaseConfigReducer';
import { Parking } from '../../interfaces/Parking';
import { FreeSlot } from '../../interfaces/FreeSlot';


export interface ParkingsPageState {
  readonly centerLat: number,
  readonly centerLon: number,
  readonly isFetchInProgress: boolean,
  readonly allParkings: Parking[],
  readonly freeParkings: FreeSlot[],
}

export const ParkingsPageInitialState: ParkingsPageState = {
  centerLat: BaseConfigInitialState.startPointLat,
  centerLon: BaseConfigInitialState.startPointLon,
  isFetchInProgress: false,
  allParkings: [],
  freeParkings: [],
};


export default function parkingsPageReducer(
  state: ParkingsPageState = ParkingsPageInitialState,
  action: ParkingsPageActions,
): ParkingsPageState {
  switch (action.type) {
    case CHANGE_CENTER_LOCATION: {
      return {
        ...state,
        centerLat: action.payload.lat,
        centerLon: action.payload.lon,
      };
    }
    case PARKINGS_FETCH_START: {
      return {
        ...state,
        isFetchInProgress: true,
      };
    }
    case PARKINGS_FETCH_SUCCESS: {
      return {
        ...state,
        allParkings: action.payload.parkings.allParkings,
        isFetchInProgress: false,
      };
    }
    default: {
      return state;
    }
  }
}
