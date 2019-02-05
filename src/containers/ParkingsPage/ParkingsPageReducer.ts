import {
  CHANGE_CENTER_LOCATION,
  PARKINGS_REQUEST_FOR_FETCH,
  PARKINGS_FETCH_SUCCESS,
  PARKINGS_FETCH_START,
} from './ParkingsPageConstants';
import { ParkingsPageActions } from './ParkingsPageActions';
import { BaseConfigInitialState } from '../BaseConfigPage/BaseConfigReducer';
import { ParkopediaParking } from '../../interfaces/Parking';
import { FreeParking } from '../../interfaces/FreeParking';


export interface ParkingsPageState {
  readonly centerLat: number,
  readonly centerLon: number,
  readonly lastParkingsCheckTimestamp: number,
  readonly isFetchInProgress: boolean,
  readonly wasFetchPerformed: boolean,
  readonly allParkings: ParkopediaParking[],
  readonly freeParkings: FreeParking[],
}

export const ParkingsPageInitialState: ParkingsPageState = {
  centerLat: BaseConfigInitialState.startPointLat,
  centerLon: BaseConfigInitialState.startPointLon,
  lastParkingsCheckTimestamp: 0,
  isFetchInProgress: false,
  wasFetchPerformed: false,
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
    case PARKINGS_REQUEST_FOR_FETCH: {
      return {
        ...state,
        isFetchInProgress: true,
      };
    }
    case PARKINGS_FETCH_START: {
      return {
        ...state,
        wasFetchPerformed: true,
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
