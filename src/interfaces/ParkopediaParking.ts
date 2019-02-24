import { Parking } from './Parking';

export type PARKOPEDIA_PARKING_TYPE = 'Parkopedia parking';
export const PARKOPEDIA_PARKING_TYPE = 'Parkopedia parking';

export interface ParkopediaParking extends Parking {
  costPerHour: string,
  maxStayDuration: number,
  restrictions: string[],
  features: string[],
  parkingType: PARKOPEDIA_PARKING_TYPE,
}

export interface ResponseParkopediaParking extends Parking {
  cost: string | null,
  maxStayDuration: number,
  maxHeight: string | null,
  restrictions: string[],
  features: string[],
}
