import isObject from 'lodash/isObject';

import { CarInfo } from '../../interfaces/CarInfo';


export function prepareCarInfo(rawCarInfo: any): CarInfo {
  if (!rawCarInfo || !isObject(rawCarInfo)) {
    return {};
  }

  return rawCarInfo;
}
