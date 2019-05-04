import { Parking } from './Parking';

export type PARKOPEDIA_PARKING_TYPE = 'Parkopedia parking';
export const PARKOPEDIA_PARKING_TYPE = 'Parkopedia parking';

export interface ParkopediaParking extends Parking {
  costPerHour: number,
  maxStayDuration: number,
  restrictions: string[],
  features: string[],
  parkingType: PARKOPEDIA_PARKING_TYPE,
}

export interface ResponseParkopediaParking extends Parking {
  costPerHour: number | null,
  maxStayDuration: number,
  maxHeight: string | null,
  restrictions: string[],
  features: string[],
}
