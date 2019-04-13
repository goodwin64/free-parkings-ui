import { combineReducers } from 'redux';
import { History, LocationState } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

import baseConfigReducer, { BaseConfigState } from '../containers/BaseConfigPage/BaseConfigReducer';
import parkingsPageReducer, { ParkingsPageState } from './parkings/reducer';
import userReducer from './userState/reducer';
import { UserInfo } from '../interfaces/UserInfo';


export interface RootReducer {
  router: RouterState,
  config: BaseConfigState,
  parkingsPage: ParkingsPageState,
  user: UserInfo,
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
