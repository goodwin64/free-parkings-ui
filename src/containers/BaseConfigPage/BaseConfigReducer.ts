import * as BaseConfigConstants from './BaseConfigConstants';
import { BaseConfigAction } from './BaseConfigActions';


export interface BaseConfigState {
  readonly parkingSearchRadius: number,
  readonly startPointLat: number,
  readonly startPointLon: number,
  readonly defaultZoomLevel: number,
  readonly sessionUid: string,
  readonly isSidebarOpen: boolean,
}

export const BaseConfigInitialState: BaseConfigState = {
  parkingSearchRadius: BaseConfigConstants.INITIAL_SEARCH_RADIUS,
  startPointLat: BaseConfigConstants.KYIV_CENTER_LAT,
  startPointLon: BaseConfigConstants.KYIV_CENTER_LON,
  defaultZoomLevel: 7,
  sessionUid: String(Math.random()).slice(2),
  isSidebarOpen: false,
};


export default function baseConfigReducer(
  state: BaseConfigState = BaseConfigInitialState,
  action: BaseConfigAction,
): BaseConfigState {
  switch (action.type) {
    case BaseConfigConstants.BASE_CONFIG_RADIUS_SET: {
      return {
        ...state,
        parkingSearchRadius: action.payload,
      };
    }
    case BaseConfigConstants.BASE_CONFIG_RADIUS_RESET: {
      return {
        ...state,
        parkingSearchRadius: BaseConfigInitialState.parkingSearchRadius,
      };
    }
    case BaseConfigConstants.BASE_CONFIG_OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case BaseConfigConstants.BASE_CONFIG_CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}
