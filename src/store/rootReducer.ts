import { combineReducers } from 'redux';
import { History, LocationState } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

import baseConfigReducer, { BaseConfigState } from '../containers/BaseConfigPage/BaseConfigReducer';
import parkingsPageReducer, { ParkingsPageState } from '../containers/ParkingsPage/ParkingsPageReducer';

export interface RootReducer {
  config: BaseConfigState,
  parkingsPage: ParkingsPageState,
  router: RouterState
}

function createRootReducer(history: History<LocationState>) {
  return combineReducers({
    config: baseConfigReducer,
    parkingsPage: parkingsPageReducer,
    router: connectRouter(history),
  });
}

export default createRootReducer;
