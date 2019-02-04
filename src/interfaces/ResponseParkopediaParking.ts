import { PointGeometry } from './PointGeometry';


export interface ResponseParkopediaParking {
  id: number,
  parkingGeometry: PointGeometry[],
  cost: string | null,
  maxStayDuration: number,
  maxHeight: number | null,
  restrictions: string[],
  features: string[],
}
