import * as BaseConfigConstants from './BaseConfigConstants';
import { BaseConfigAction } from './BaseConfigActions';


export interface BaseConfigState {
  readonly parkingSearchRadius: number,
  readonly startPointLat: number,
  readonly startPointLon: number,
  readonly defaultZoomLevel: number,
  readonly sessionUid: string,
}

export const BaseConfigInitialState: BaseConfigState = {
  parkingSearchRadius: BaseConfigConstants.INITIAL_SEARCH_RADIUS,
  startPointLat: BaseConfigConstants.STUTTGART_CENTER_LAT,
  startPointLon: BaseConfigConstants.STUTTGART_CENTER_LON,
  defaultZoomLevel: 7,
  sessionUid: String(Math.random()).slice(2),
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
    default: {
      return state;
    }
  }
}
