import { Parking } from './Parking';
import { PointGeometry } from './PointGeometry';


export type FREE_PARKING_TYPE = 'Free parking';
export const FREE_PARKING_TYPE = 'Free parking';

export interface FreeParking extends Parking {
  parkingType: FREE_PARKING_TYPE,
  slotOrientation: 'parallel' | 'perpendicular',
  matched: boolean,
  slotLength: string,
}

export interface ResponseFreeParking extends Parking {
  id: string,
  freeSlotsGeometry: PointGeometry[],
  slotOrientation: 'parallel' | 'perpendicular',
  matched: boolean,
  slotLength: string,
}

export function isFreeParking(object: any): object is FreeParking {
  return object && object.parkingType === FREE_PARKING_TYPE;
}
