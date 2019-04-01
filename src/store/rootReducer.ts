import { combineReducers } from 'redux';
import { History, LocationState } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

import baseConfigReducer, { BaseConfigState } from '../containers/BaseConfigPage/BaseConfigReducer';
import parkingsPageReducer, { ParkingsPageState } from '../containers/ParkingsPage/ParkingsPageReducer';
import userReducer, { UserState } from '../containers/UserPage/UserReducer';

export interface RootReducer {
  router: RouterState,
  config: BaseConfigState,
  parkingsPage: ParkingsPageState,
  user: UserState,
}

function createRootReducer(history: History<LocationState>) {
  return combineReducers({
    router: connectRouter(history),
    config: baseConfigReducer,
    parkingsPage: parkingsPageReducer,
    user: userReducer,
  });
}

export default createRootReducer;
