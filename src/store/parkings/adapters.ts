import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

import { PARKOPEDIA_PARKING_TYPE, ParkopediaParking } from '../../interfaces/ParkopediaParking';
import { PointGeometry } from '../../interfaces/PointGeometry';
import { ResponseParkopediaParking } from '../../interfaces/ParkopediaParking';
import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';
import { FREE_PARKING_TYPE, FreeParking, ResponseFreeParking } from '../../interfaces/FreeParking';


export function prepareParkings(
  rawResponseParkings?: ResponseParkings
): PreparedParkings {
  let preparedResponse: PreparedParkings = {
    allParkings: [],
    freeParkings: [],
  };

  if (!rawResponseParkings || !isObject(rawResponseParkings)) {
    return preparedResponse;
  }

  if (isArray(rawResponseParkings.allParkings)) {
    preparedResponse.allParkings = prepareParkopediaParkings(rawResponseParkings.allParkings);
  }

  if (isArray(rawResponseParkings.freeSlots)) {
    preparedResponse.freeParkings = prepareFreeParkings(rawResponseParkings.freeSlots);
  }

  return preparedResponse;
}

function prepareParkopediaParkings(allParkings: ResponseParkopediaParking[]): ParkopediaParking[] {
  return allParkings.map(prepareParkopediaParkingSlot);
}

function prepareFreeParkings(freeParkings: ResponseFreeParking[]): FreeParking[] {
  return freeParkings.map(prepareFreeParkingSlot);
}

function prepareParkopediaParkingSlot(parkingSlot: ResponseParkopediaParking): ParkopediaParking {
  let preparedParking: ParkopediaParking = {
    id: '-1',
    parkingGeometry: [],
    costPerHour: '',
    maxStayDuration: 0,
    restrictions: [],
    features: [],
    parkingType: PARKOPEDIA_PARKING_TYPE,
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

function prepareFreeParkingSlot(parkingSlot: ResponseFreeParking): FreeParking {
  let preparedFreeParking: FreeParking = {
    id: '-1',
    parkingGeometry: [],
    parkingType: FREE_PARKING_TYPE,
    slotOrientation: 'parallel',
    matched: false,
    slotLength: 'N/A',
  };

  if (isArray(parkingSlot.freeSlotsGeometry)) {
    // FIXME .map().filter() ts issue - change array arity
    // @ts-ignore
    preparedFreeParking.parkingGeometry = parkingSlot.freeSlotsGeometry
      .map(preparePoint)
      .filter(Boolean);
  }

  if (parkingSlot.id) {
    preparedFreeParking.id = parkingSlot.id;
  }

  if (parkingSlot.slotOrientation) {
    preparedFreeParking.slotOrientation = parkingSlot.slotOrientation;
  }

  if (parkingSlot.matched) {
    preparedFreeParking.matched = parkingSlot.matched;
  }

  if (parkingSlot.slotLength) {
    preparedFreeParking.slotLength = parkingSlot.slotLength;
  }

  return preparedFreeParking;
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
