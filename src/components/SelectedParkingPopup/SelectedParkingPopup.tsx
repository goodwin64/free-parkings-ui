import React from 'react';
import * as turf from '@turf/turf';
import { Popup } from 'react-mapbox-gl';

import { Parking } from '../../interfaces/Parking';
import * as styles from './SelectedParkingPopup.module.css';
import './SelectedParkingPopup.global.css';


interface SelectedParkingPopupProps {
  selectedParking: Parking | null,
  closePopup: () => void,
}

class SelectedParkingPopup extends React.PureComponent<SelectedParkingPopupProps> {

  render() {
    if (!this.props.selectedParking) {
      return null;
    }

    const parkingPolyline = turf.lineString(this.props.selectedParking.parkingGeometry);
    const parkingPolylineCenter = turf.center(parkingPolyline);

    if (!parkingPolylineCenter.geometry) {
      return null;
    }

    return (
      <Popup
        coordinates={parkingPolylineCenter.geometry.coordinates}
        className={styles['PopupContainer']}
      >
        <p>Cost:</p>
        <p>{this.props.selectedParking.costPerHour || 'N/A'}</p>

        <p>Max stay duration:</p>
        <p>
          {this.props.selectedParking.maxStayDuration
            ? this.props.selectedParking.maxStayDuration + 'min'
            : 'N/A'
          }
        </p>

        <p>Restrictions:</p>
        <p>
          {this.props.selectedParking.restrictions.length > 0
            ? this.props.selectedParking.restrictions.join(', ')
            : 'None'
          }
        </p>

        <p>Features:</p>
        <p>
          {this.props.selectedParking.features.length > 0
            ? this.props.selectedParking.features.join(', ')
            : 'None'
          }
        </p>
      </Popup>
    );
  }
}

export default SelectedParkingPopup;
