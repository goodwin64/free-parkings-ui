import React from 'react';
import { Popup } from 'react-mapbox-gl';

import Button from '../Button/Button';
import './SelectedParkingPopup.global.css';
import { LatLon } from '../../interfaces/LatLon';
import * as styles from './SelectedParkingPopup.module.css';
import { geometryObjToLonLat } from '../../utils/geometry';
import { Parking } from '../../interfaces/Parking';
import { openPopupDetails } from '../LayerParkings/LayerParkings';


interface SelectedParkingPopupProps {
  selectedParking: Parking | null,
  popupCoordinates: LatLon | null,
  openPopupDetails: openPopupDetails,
  closePopup: () => void,
}

class SelectedParkingPopup extends React.PureComponent<SelectedParkingPopupProps> {
  componentDidMount() {
    document.addEventListener('keyup', this.keyPressHandler);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keyup', this.keyPressHandler);
  }

  keyPressHandler: React.EventHandler<any> = (e: React.KeyboardEvent) => {
    if (e.keyCode === 27 && this.props.selectedParking) {
      this.props.closePopup();
    }
  };

  static renderParkingPopup(parking: Parking): React.ReactNode {
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

  openPopupDetails = () => {
    if (this.props.selectedParking) {
      this.props.openPopupDetails(this.props.selectedParking);
    }
  };

  render() {
    if (!this.props.selectedParking || !this.props.popupCoordinates) {
      return null;
    }

    return (
      <Popup
        coordinates={geometryObjToLonLat(this.props.popupCoordinates)}
        className={styles['PopupContainer']}
        offset={10}
      >
        <button
          className={styles['PopupCloseButton']}
          onClick={this.props.closePopup}
        >
          ×
        </button>
        {SelectedParkingPopup.renderParkingPopup(this.props.selectedParking)}
        <Button onClick={this.openPopupDetails}>Details</Button>
      </Popup>
    );
  }
}

export default SelectedParkingPopup;
