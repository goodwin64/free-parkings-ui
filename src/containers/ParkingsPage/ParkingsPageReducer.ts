import { CHANGE_CENTER_LOCATION, PARKINGS_FETCH_START, PARKINGS_FETCH_SUCCESS } from './ParkingsPageConstants';
import { ParkingsPageActions } from './ParkingsPageActions';
import { BaseConfigInitialState } from '../BaseConfigPage/BaseConfigReducer';
import { ParkopediaParking } from '../../interfaces/Parking';
import { FreeParking } from '../../interfaces/FreeParking';


export interface ParkingsPageState {
  readonly centerLat: number,
  readonly centerLon: number,
  readonly isFetchInProgress: boolean,
  readonly allParkings: ParkopediaParking[],
  readonly freeParkings: FreeParking[],
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
        freeParkings: action.payload.parkings.freeParkings,
        isFetchInProgress: false,
      };
    }
    default: {
      return state;
    }
  }
}
