import { Parking } from './Parking';
import { PointGeometry } from './PointGeometry';


export interface FreeParking extends Parking {}

export interface ResponseFreeParking extends Parking {
  id: number,
  freeSlotsGeometry: PointGeometry[],
  slotOrientation: 'parallel' | 'perpendicular',
}
