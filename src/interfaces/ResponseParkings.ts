import { Parking } from './Parking';
import { FreeSlot } from './FreeSlot';


export interface ResponseParkings {
  allParkings: Parking[],
  freeSlots: FreeSlot[],
}