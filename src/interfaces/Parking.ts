import { PointGeometry } from './PointGeometry';


export interface Parking {
  id: string,
  parkingGeometry: PointGeometry[],
}

export interface CreatedParkingParameters {
  parkingsGeoJsonSource: string,
  isLatLon: boolean,
  parkingLength: number,
  parkingWidth: number,
  parkingHeight: number,
}
