import * as BaseConfigConstants from './BaseConfigConstants';
import { BaseConfigAction } from './BaseConfigActions';


export interface BaseConfigState {
  readonly parkingSearchRadius: number,
  readonly startPointLat: number,
  readonly startPointLon: number,
  readonly sessionUid: string,
}

export const BaseConfigInitialState: BaseConfigState = {
  parkingSearchRadius: BaseConfigConstants.INITIAL_SEARCH_RADIUS,
  startPointLat: BaseConfigConstants.PARIS_CENTER_LAT,
  startPointLon: BaseConfigConstants.PARIS_CENTER_LON,
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
