import React from 'react';

import magnifier from '../../assets/images/magnifier.svg';
import mapMarker from '../../assets/images/mapMarker.png';
import * as styles from './CursorMapCenter.module.css';


interface CursorMapCenterProps {
  isSearchRadiusTooBig: boolean,
}

class CursorMapCenter extends React.PureComponent<CursorMapCenterProps> {
  static renderMagnifierPulsed() {
    return (
      <React.Fragment>
        <img src={magnifier} alt="" className={styles['magnifierPulse']}/>
        <br/>
        <h2 className={styles['zoomInMessage']}>Please zoom in to load parkings</h2>
      </React.Fragment>
    );
  }

  static renderCoordinatesMarker() {
    return (
      <img src={mapMarker} alt="You're here" className={styles['YourMarkerImage']}/>
    );
  }

  render() {
    return (
      <div className={styles['CursorMapCenterContainer']}>
        {
          this.props.isSearchRadiusTooBig
            ? CursorMapCenter.renderMagnifierPulsed()
            : CursorMapCenter.renderCoordinatesMarker()
        }
      </div>
    );
  }
}

export default CursorMapCenter;