import { combineReducers } from 'redux';

import baseConfigReducer, { BaseConfigState } from './BaseConfig/BaseConfigReducer';

export interface RootReducer {
  config: BaseConfigState,
}

const rootReducer = combineReducers({
  config: baseConfigReducer,
});

export default rootReducer;
