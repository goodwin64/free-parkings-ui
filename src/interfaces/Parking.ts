import { PointGeometry } from './PointGeometry';


export interface Parking extends ResponseParking {}

export interface ResponseParking extends ParkingServerExpects {
  id: string,
}

export interface ParkingServerExpects {
  id?: string,
  geometry: PointGeometry[],
  length: number,
  width: number,
  height: number,
  costPerHour: number,
  maxStayDuration: number,
  restrictions: string[],
  features: string[],
}

export interface ClientParking {
  id?: string,
  parkingsGeoJsonSource: string,
  isLatLon: boolean,
  parkingLength: number,
  parkingWidth: number,
  parkingHeight: number,
  costPerHour: number,
  maxStayDuration: number,
  features: string[],
  restrictions: string[],
}
