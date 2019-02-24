import React from 'react';
import * as turf from '@turf/turf';
import { Popup } from 'react-mapbox-gl';

import { FreeParking, isFreeParking } from '../../interfaces/FreeParking';
import { ParkopediaParking } from '../../interfaces/ParkopediaParking';

import * as styles from './SelectedParkingPopup.module.css';
import './SelectedParkingPopup.global.css';


interface SelectedParkingPopupProps {
  selectedParking: ParkopediaParking | FreeParking | null,
  closePopup: () => void,
}

class SelectedParkingPopup extends React.PureComponent<SelectedParkingPopupProps> {
  static renderFreeParkingPopup(parking: FreeParking): React.ReactNode {
    return (
      <React.Fragment>
        <p>Length (m):</p>
        <p>{parking.slotLength}</p>

        <p>Slot orientation:</p>
        <p>{parking.slotOrientation}</p>
      </React.Fragment>
    )
  }

  static renderParkopediaParkingPopup(parking: ParkopediaParking): React.ReactNode {
    return (
      <React.Fragment>
        <p>Cost:</p>
        <p>{parking.costPerHour || 'N/A'}</p>

        <p>Max stay duration:</p>
        <p>
          {parking.maxStayDuration
            ? parking.maxStayDuration + 'min'
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
        { isFreeParking(this.props.selectedParking)
          ? SelectedParkingPopup.renderFreeParkingPopup(this.props.selectedParking)
          : SelectedParkingPopup.renderParkopediaParkingPopup(this.props.selectedParking)
        }
      </Popup>
    );
  }
}

export default SelectedParkingPopup;
