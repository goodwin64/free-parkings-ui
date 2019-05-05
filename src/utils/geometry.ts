import { LatLon } from '../interfaces/LatLon';
import { PointGeometry } from '../interfaces/PointGeometry';


export function geometryLatLonToLonLat(geometry: PointGeometry[]) {
  return geometry.map((p) => p.slice().reverse());
}

export function geometryObjToLonLat(geometry: LatLon) {
  return [geometry.lon, geometry.lat];
}
