import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import { ResponseParkings } from '../../interfaces/ResponseParkings';
import { Parking } from '../../interfaces/Parking';
import { PointGeometry } from '../../interfaces/PointGeometry';

export function prepareResponseParkings(rawResponseParkings: ResponseParkings) {
  let preparedResponse: ResponseParkings = {
    allParkings: [],
    freeSlots: [],
  };

  if (!isObject(rawResponseParkings)) {
    return preparedResponse;
  }

  if (isArray(rawResponseParkings.allParkings)) {
    preparedResponse.allParkings = prepareAllParkings(rawResponseParkings.allParkings);
  }

  return preparedResponse;
}

function prepareAllParkings(allParkings: Parking[]): Parking[] {
  return allParkings.map(prepareParkingSlot);
}

function prepareParkingSlot(parkingSlot: Parking): Parking {
  let preparedParking: Parking = {
    id: -1,
    parkingGeometry: [],
    parkingGeometryType: 'polyline',
  };

  if (isArray(parkingSlot.parkingGeometry)) {
    // @ts-ignore
    preparedParking.parkingGeometry = parkingSlot.parkingGeometry
      .map(preparePoint)
      .filter(Boolean);
  }

  if (parkingSlot.id) {
    preparedParking.id = parkingSlot.id;
  }

  if (parkingSlot.parkingGeometryType) {
    preparedParking.parkingGeometryType = parkingSlot.parkingGeometryType;
  }

  return preparedParking;
}

/**
 * Store points as [lon, lat] because MapBox expects this format.
 * @param geometryPoint
 */
function preparePoint(geometryPoint: PointGeometry) {
  let preparedPoint: PointGeometry;
  if (!isArray(geometryPoint)) {
    return null;
  }
  const [lat, lon] = geometryPoint;
  if (!lat && !lon) {
    return null;
  }
  preparedPoint = [lon, lat];

  return preparedPoint;
}
