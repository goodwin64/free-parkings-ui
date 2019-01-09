import { BASE_CONFIG_RADIUS_RESET, BASE_CONFIG_RADIUS_SET } from './BaseConfigConstants';
import { BaseConfigAction } from './BaseConfigActions';


export interface BaseConfigState {
  readonly parkingSearchRadius: number,
  readonly startPointLat: number,
  readonly startPointLon: number,
}

export const BaseConfigInitialState: BaseConfigState = {
  parkingSearchRadius: 2000,
  startPointLat: 48.855796,
  startPointLon: 2.356566,
};


export default function baseConfigReducer(
  state: BaseConfigState = BaseConfigInitialState,
  action: BaseConfigAction,
): BaseConfigState {
  switch (action.type) {
    case BASE_CONFIG_RADIUS_SET: {
      return {
        ...state,
        parkingSearchRadius: action.payload,
      };
    }
    case BASE_CONFIG_RADIUS_RESET: {
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
