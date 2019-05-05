import { PointGeometry } from '../interfaces/PointGeometry';


export function geometryLatLonToLonLat(geometry: PointGeometry[]) {
  return geometry.map((p) => p.slice().reverse());
}
