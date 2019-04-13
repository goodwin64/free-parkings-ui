import {
  CHANGE_CENTER_LOCATION,
  PARKINGS_REQUEST_FOR_FETCH,
  PARKINGS_FETCH_SUCCESS,
  PARKINGS_FETCH_START,
  CHECK_PARKOPEDIA_UPDATES_SUCCESS,
  CLEAR_ALL_FREE_SLOTS,
  CHANGE_ZOOM_LEVEL,
} from './constants';
import { Actions } from './actions';
import { BaseConfigInitialState } from '../../containers/BaseConfigPage/BaseConfigReducer';
import { ParkopediaParking } from '../../interfaces/ParkopediaParking';
import { FreeParking } from '../../interfaces/FreeParking';


export interface ParkingsPageState {
  readonly centerLat: number,
  readonly centerLon: number,
  readonly zoomLevel: number,
  readonly lastParkingsCheckTimestamp: number,
  readonly lastParkingsCheckUpdatesCount: number,
  readonly isFetchInProgress: boolean,
  readonly wasFetchPerformed: boolean,
  readonly allParkings: ParkopediaParking[],
  readonly freeParkings: FreeParking[],
}

export const ParkingsPageInitialState: ParkingsPageState = {
  centerLat: BaseConfigInitialState.startPointLat,
  centerLon: BaseConfigInitialState.startPointLon,
  zoomLevel: BaseConfigInitialState.defaultZoomLevel,
  lastParkingsCheckTimestamp: 0,
  lastParkingsCheckUpdatesCount: 0,
  isFetchInProgress: false,
  wasFetchPerformed: false,
  allParkings: [],
  freeParkings: [],
};


export default function reducer(
  state: ParkingsPageState = ParkingsPageInitialState,
  action: Actions,
): ParkingsPageState {
  switch (action.type) {
    case CHANGE_CENTER_LOCATION: {
      return {
        ...state,
        centerLat: action.payload.lat,
        centerLon: action.payload.lon,
        lastParkingsCheckTimestamp: ParkingsPageInitialState.lastParkingsCheckTimestamp,
        lastParkingsCheckUpdatesCount: ParkingsPageInitialState.lastParkingsCheckUpdatesCount,
      };
    }
    case CHANGE_ZOOM_LEVEL: {
      return {
        ...state,
        zoomLevel: action.payload,
      }
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
    case CHECK_PARKOPEDIA_UPDATES_SUCCESS: {
      return {
        ...state,
        lastParkingsCheckTimestamp: action.payload.timestamp,
        lastParkingsCheckUpdatesCount: action.payload.updatesCount,
        isFetchInProgress: false,
      };
    }
    case CLEAR_ALL_FREE_SLOTS: {
      return {
        ...state,
        freeParkings: ParkingsPageInitialState.freeParkings,
        lastParkingsCheckTimestamp: ParkingsPageInitialState.lastParkingsCheckTimestamp,
      }
    }
    default: {
      return state;
    }
  }
}
