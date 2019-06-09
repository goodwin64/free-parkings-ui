import uniqBy from 'lodash/uniqBy';

import {
  CHANGE_CENTER_LOCATION,
  PARKINGS_REQUEST_FOR_FETCH,
  PARKINGS_FETCH_SUCCESS,
  PARKINGS_FETCH_START,
  CHECK_PARKINGS_UPDATES_SUCCESS,
  DELETE_PARKING,
  DELETE_ALL_FREE_SLOTS,
  CHANGE_ZOOM_LEVEL,
  POST_PARKING_ATTEMPT,
  POST_PARKING_SUCCESS,
} from './constants';
import { Actions } from './actions';
import { BaseConfigInitialState } from '../../containers/BaseConfigPage/BaseConfigReducer';
import { Parking } from '../../interfaces/Parking';


export interface ParkingsPageState {
  readonly centerLat: number,
  readonly centerLon: number,
  readonly zoomLevel: number,
  readonly lastParkingsCheckTimestamp: number,
  readonly lastParkingsCheckUpdatesCount: number,
  readonly isFetchInProgress: boolean,
  readonly wasFetchPerformed: boolean,
  readonly busyParkings: Parking[],
  readonly freeParkings: Parking[],
}

export const ParkingsPageInitialState: ParkingsPageState = {
  centerLat: BaseConfigInitialState.startPointLat,
  centerLon: BaseConfigInitialState.startPointLon,
  zoomLevel: BaseConfigInitialState.defaultZoomLevel,
  lastParkingsCheckTimestamp: 0,
  lastParkingsCheckUpdatesCount: 0,
  isFetchInProgress: false,
  wasFetchPerformed: false,
  busyParkings: [],
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
        busyParkings: uniqBy([
          ...state.busyParkings,
          ...action.payload.filter(p => !p.isFree),
        ], 'id'),
        freeParkings: uniqBy([
          ...state.freeParkings,
          ...action.payload.filter(p => p.isFree),
        ], 'id'),
        isFetchInProgress: false,
      };
    }
    case POST_PARKING_ATTEMPT: {
      return {
        ...state,
        isFetchInProgress: true,
        busyParkings: [...state.busyParkings.filter(p => p.id !== action.payload.parkingCreated.id)],
        freeParkings: [...state.freeParkings.filter(p => p.id !== action.payload.parkingCreated.id)],
      };
    }
    case POST_PARKING_SUCCESS: {
      const isFreeNow = action.payload.isFree;
      const busyParkings = isFreeNow
        ? state.busyParkings
        : uniqBy([...state.busyParkings, action.payload.parkingCreated], 'id');
      const freeParkings = isFreeNow
        ? uniqBy([...state.freeParkings, action.payload.parkingCreated], 'id')
        : state.freeParkings;

      return {
        ...state,
        busyParkings,
        freeParkings,
        isFetchInProgress: false,
      };
    }
    case CHECK_PARKINGS_UPDATES_SUCCESS: {
      return {
        ...state,
        lastParkingsCheckTimestamp: action.payload.timestamp,
        lastParkingsCheckUpdatesCount: action.payload.updatesCount,
        isFetchInProgress: false,
      };
    }
    case DELETE_PARKING: {
      return {
        ...state,
        busyParkings: state.busyParkings.filter(({id}) => id !== action.payload),
        freeParkings: state.freeParkings.filter(({id}) => id !== action.payload),
      }
    }
    case DELETE_ALL_FREE_SLOTS: {
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
