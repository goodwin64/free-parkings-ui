import React from 'react';
import PropTypes from 'prop-types';

import magnifier from '../../assets/images/magnifier.svg';
import * as css from './CursorMapCenter.module.css';
import { MAX_SEARCH_RADIUS_TO_FETCH } from '../../containers/BaseConfigPage/BaseConfigConstants';


interface CursorMapCenterProps {
  centerLat: number,
  centerLon: number,
  radius: number,
}

class CursorMapCenter extends React.PureComponent<CursorMapCenterProps> {
  static propTypes = {
    centerLat: PropTypes.number.isRequired,
    centerLon: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
  };

  static renderMagnifierPulsed() {
    return (
      <React.Fragment>
        <img src={magnifier} alt="" className={css['magnifier-pulse']}/>
      </React.Fragment>
    );
  }

  renderCoordinatesMarker() {
    const {
      centerLat,
      centerLon,
      radius,
    } = this.props;

    const [lat, lon] = [
      centerLat.toFixed(2),
      centerLon.toFixed(2),
    ];

    return (
      <React.Fragment>
        [{lat}:{lon},{radius}m]
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={css['container']}>
        {
          this.props.radius > MAX_SEARCH_RADIUS_TO_FETCH
            ? CursorMapCenter.renderMagnifierPulsed()
            : this.renderCoordinatesMarker()
        }
      </div>
    );
  }
}

export default CursorMapCenter;