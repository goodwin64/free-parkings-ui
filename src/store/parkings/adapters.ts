import {
  ClientParking,
  Parking,
  ParkingServerExpects,
} from '../../interfaces/Parking';
import { PointGeometry } from '../../interfaces/PointGeometry';
import { ResponseParking } from '../../interfaces/Parking';
import { PreparedParkings, ResponseParkings } from '../../interfaces/ResponseParkings';


export function prepareParkings(
  rawResponseParkings?: ResponseParkings
): PreparedParkings {
  let preparedResponse: PreparedParkings = [];

  if (!rawResponseParkings || !Array.isArray(rawResponseParkings)) {
    return preparedResponse;
  }

  preparedResponse = prepareParkingParkings(rawResponseParkings);

  return preparedResponse;
}

function prepareParkingParkings(allParkings: ResponseParking[]): Parking[] {
  return allParkings.map(prepareParkingSlot);
}

function prepareParkingSlot(parkingSlot: ResponseParking): Parking {
  return parkingSlot;
}


export function prepareParkingParametersFromClientToServer(rawParkingParameters: ClientParking): ParkingServerExpects {
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
