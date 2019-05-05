import {
  ClientParkopediaParking,
  ParkopediaParking,
  ParkopediaParkingServerExpects,
} from '../../interfaces/ParkopediaParking';
import { PointGeometry } from '../../interfaces/PointGeometry';
import { ResponseParkopediaParking } from '../../interfaces/ParkopediaParking';
import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';


export function prepareParkings(
  rawResponseParkings?: ResponseParkings
): PreparedParkings {
  let preparedResponse: PreparedParkings = [];

  if (!rawResponseParkings || !Array.isArray(rawResponseParkings)) {
    return preparedResponse;
  }

  preparedResponse = prepareParkopediaParkings(rawResponseParkings);

  return preparedResponse;
}

function prepareParkopediaParkings(allParkings: ResponseParkopediaParking[]): ParkopediaParking[] {
  return allParkings.map(prepareParkopediaParkingSlot);
}

function prepareParkopediaParkingSlot(parkingSlot: ResponseParkopediaParking): ParkopediaParking {
  return parkingSlot;
}


export function prepareParkingParametersFromClientToServer(rawParkingParameters: ClientParkopediaParking): ParkopediaParkingServerExpects {
  const {
    parkingsGeoJsonSource: rawGeometry,
    isLatLon,
    parkingLength: length,
    parkingWidth: width,
    parkingHeight: height,
    ...restParameters
  } = rawParkingParameters;
  const geometry = prepareUserInputParkingGeometry(rawGeometry, isLatLon);

  return {
    ...restParameters,
    geometry,
    length,
    width,
    height,
  }
}

export function prepareUserInputParkingGeometry(rawParkingGeometry: string, isLatLon: boolean): PointGeometry[] {
  const parkingPoints = rawParkingGeometry
    .split('\n')
    .map(p => prepareUserInputParkingPoint(p, isLatLon))
    .filter(isValidPoint)
  ;

  if (parkingPoints.length < 2) {
    return [];
  }
  return parkingPoints;
}

function prepareUserInputParkingPoint(rawParkingPoint: string, isLatLon: boolean): PointGeometry {
  const [lat, lon] = rawParkingPoint
    .split(',')
    .map(s => parseFloat(s.trim()))
  ;
  return isLatLon ? [lat, lon] : [lon, lat];
}

function isValidPoint(pointGeometry: PointGeometry) {
  return Array.isArray(pointGeometry) && pointGeometry.length === 2 && pointGeometry.every(isFinite);
}
