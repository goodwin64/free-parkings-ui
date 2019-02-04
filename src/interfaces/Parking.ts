import { PointGeometry } from './PointGeometry';


export interface Parking {
  id: number,
  parkingGeometry: PointGeometry[],
  costPerHour: string,
  maxStayDuration: number,
  restrictions: string[],
  features: string[],
}

export interface ResponseParkopediaParking {
  id: number,
  parkingGeometry: PointGeometry[],
  cost: string | null,
  maxStayDuration: number,
  maxHeight: number | null,
  restrictions: string[],
  features: string[],
}

export interface ParkopediaParking extends Parking {}
