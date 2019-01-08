import { combineReducers } from 'redux';
import { History, LocationState } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

import baseConfigReducer, { BaseConfigState } from './BaseConfig/BaseConfigReducer';

export interface RootReducer {
  config: BaseConfigState,
  router: RouterState
}

function createRootReducer(history: History<LocationState>) {
  return combineReducers({
    config: baseConfigReducer,
    router: connectRouter(history),
  });
}

export default createRootReducer;
