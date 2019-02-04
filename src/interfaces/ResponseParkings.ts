import { ParkopediaParking, ResponseParkopediaParking } from './Parking';
import { FreeParking } from './FreeParking';


export interface ResponseParkings {
  allParkings: ResponseParkopediaParking[],
  freeSlots: FreeParking[],
}

export interface PreparedParkings {
  allParkings: ParkopediaParking[],
  freeSlots: FreeParking[],
}