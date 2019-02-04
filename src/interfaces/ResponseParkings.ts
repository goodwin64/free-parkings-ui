import { ParkopediaParking} from './Parking';
import { FreeParking, ResponseFreeParking } from './FreeParking';
import { ResponseParkopediaParking } from './ResponseParkopediaParking';


export interface ResponseParkings {
  allParkings: ResponseParkopediaParking[],
  freeSlots: ResponseFreeParking[],
}

export interface PreparedParkings {
  allParkings: ParkopediaParking[],
  freeParkings: FreeParking[],
}