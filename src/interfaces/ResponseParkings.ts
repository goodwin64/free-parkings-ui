import { ParkopediaParking} from './ParkopediaParking';
import { FreeParking, ResponseFreeParking } from './FreeParking';
import { ResponseParkopediaParking } from './ParkopediaParking';


export interface ResponseParkings {
  allParkings: ResponseParkopediaParking[],
  freeSlots: ResponseFreeParking[],
}

export interface PreparedParkings {
  allParkings: ParkopediaParking[],
  freeParkings: FreeParking[],
}