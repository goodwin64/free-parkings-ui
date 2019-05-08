import { RootReducer } from '../rootReducer';
import { createSelector } from 'reselect';

export const carInfoSelector = (state: RootReducer) => state.car.carInfo;

export const isCarInfoFullyFilledSelector = createSelector(
  [carInfoSelector],
  carInfo => Boolean(carInfo.length && carInfo.width && carInfo.height),
);

export const carManufacturersSelector = (state: RootReducer) => state.car.carManufacturers;

export const carPageIsInProgressSelector = (state: RootReducer) => state.car.isInProgress;
export const carPageIsErrorSelector = (state: RootReducer) => state.car.isError;
export const carPageIsCachedSelector = (state: RootReducer) => state.car.isCached;
