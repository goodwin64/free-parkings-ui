import { PointGeometry } from './PointGeometry';


export interface ParkopediaParking extends ResponseParkopediaParking {}

export interface ResponseParkopediaParking extends ParkopediaParkingServerExpects {
  id: string,
}

export interface ParkopediaParkingServerExpects {
  geometry: PointGeometry[],
  length: number,
  width: number,
  height: number,
  costPerHour: number,
  maxStayDuration: number,
  restrictions: string[],
  features: string[],
}

export interface ClientParkopediaParking {
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
