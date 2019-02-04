import { Parking } from './Parking';


export interface FreeParking extends Parking {
  slotOrientation: 'parallel' | 'perpendicular'
}
