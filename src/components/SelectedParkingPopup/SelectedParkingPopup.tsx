import React from 'react';
import * as turf from '@turf/turf';
import { Popup } from 'react-mapbox-gl';

import './SelectedParkingPopup.global.css';
import * as styles from './SelectedParkingPopup.module.css';
import { geometryLatLonToLonLat } from '../../utils/geometry';
import { ParkopediaParking } from '../../interfaces/ParkopediaParking';


interface SelectedParkingPopupProps {
  selectedParking: ParkopediaParking | null,
  closePopup: () => void,
}

class SelectedParkingPopup extends React.PureComponent<SelectedParkingPopupProps> {

  static renderParkopediaParkingPopup(parking: ParkopediaParking): React.ReactNode {
    return (
      <React.Fragment>
        <p>Cost:</p>
        <p>{parking.costPerHour ? `$${parking.costPerHour} per hour` : 'N/A'}</p>

        <p>Max stay duration:</p>
        <p>
          {parking.maxStayDuration
            ? parking.maxStayDuration + ' min'
            : 'N/A'
          }
        </p>

        <p>Restrictions:</p>
        <p>
          {parking.restrictions.length > 0
            ? parking.restrictions.join(', ')
            : 'N/A'
          }
        </p>

        <p>Features:</p>
        <p>
          {parking.features.length > 0
            ? parking.features.join(', ')
            : 'N/A'
          }
        </p>
      </React.Fragment>
    );
  }

  render() {
    if (!this.props.selectedParking) {
      return null;
    }

    const parkingPolyline = turf.lineString(geometryLatLonToLonLat(this.props.selectedParking.geometry));
    const parkingPolylineCenter = turf.center(parkingPolyline);

    if (!parkingPolylineCenter.geometry) {
      return null;
    }

    return (
      <Popup
        coordinates={parkingPolylineCenter.geometry.coordinates}
        className={styles['PopupContainer']}
      >
        {SelectedParkingPopup.renderParkopediaParkingPopup(this.props.selectedParking)}
      </Popup>
    );
  }
}

export default SelectedParkingPopup;
