import { PointGeometry } from './PointGeometry';


export interface Parking {
  id: number,
  parkingGeometry: PointGeometry[],
}

export interface ParkopediaParking extends Parking {
  costPerHour: string,
  maxStayDuration: number,
  restrictions: string[],
  features: string[],
}
