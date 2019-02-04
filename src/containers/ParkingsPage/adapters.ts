import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';
import { ParkopediaParking, ResponseParkopediaParking } from '../../interfaces/Parking';
import { PointGeometry } from '../../interfaces/PointGeometry';


export function prepareParkopediaResponseParkings(
  rawResponseParkings?: ResponseParkings
): PreparedParkings {
  let preparedResponse: PreparedParkings = {
    allParkings: [],
    freeSlots: [],
  };

  if (!rawResponseParkings || !isObject(rawResponseParkings)) {
    return preparedResponse;
  }

  if (isArray(rawResponseParkings.allParkings)) {
    preparedResponse.allParkings = prepareParkopediaParkings(rawResponseParkings.allParkings);
  }

  return preparedResponse;
}

function prepareParkopediaParkings(allParkings: ResponseParkopediaParking[]): ParkopediaParking[] {
  return allParkings.map(prepareParkopediaParkingSlot);
}

function prepareParkopediaParkingSlot(parkingSlot: ResponseParkopediaParking): ParkopediaParking {
  let preparedParking: ParkopediaParking = {
    id: -1,
    parkingGeometry: [],
    costPerHour: 'N/A',
    maxStayDuration: 0,
    restrictions: [],
    features: [],
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

  if (parkingSlot.cost) {
    preparedParking.costPerHour = parkingSlot.cost;
  }

  if (parkingSlot.maxStayDuration) {
    preparedParking.maxStayDuration = parkingSlot.maxStayDuration;
  }

  if (parkingSlot.restrictions) {
    preparedParking.restrictions = parkingSlot.restrictions;
  }

  if (parkingSlot.features) {
    preparedParking.features = parkingSlot.features;
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
