import { PointGeometry } from './PointGeometry';


export interface Parking {
  id: number,
  parkingGeometry: PointGeometry[],
  parkingGeometryType: 'polyline',
}
