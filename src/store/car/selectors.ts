import { RootReducer } from '../rootReducer';

export const carInfoSelector = (state: RootReducer) => state.car.carInfo;

export const carPageIsInProgressSelector = (state: RootReducer) => state.car.isInProgress;
export const carPageIsErrorSelector = (state: RootReducer) => state.car.isError;
export const carPageIsCachedSelector = (state: RootReducer) => state.car.isCached;
