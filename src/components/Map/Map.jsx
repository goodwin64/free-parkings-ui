import React from 'react';
import MapGL, { FlyToInterpolator, Marker, Popup } from 'react-map-gl';

import * as style from './Map.module.css';
import ControlPanelCities from '../ControlPanel';
import ParkingInfo from '../ParkingInfo';
import Pin from '../Pin/Pin';


class Map extends React.PureComponent {
  static mapToken = 'pk.eyJ1IjoiY2xvdWRtYWRlIiwiYSI6ImNqcG56a3VoZTA0dTc0OHF0d21rOTk0eHoifQ.sB4G-WjZ1JdB_fqAaPeULQ';
  static stylesUrl = `mapbox://styles/mapbox/dark-v9`;

  state = {
    viewport: {
      width: '100%',
      height: '100%',
      latitude: 48.8587,
      longitude: 2.3569,
      zoom: 11,
      bearing: 0,
      pitch: 0,
    },
    parking: null,
  };

  onViewportChange = (viewport) => {
    this.setState((prevState) => ({
      viewport: { ...prevState.viewport, ...viewport },
    }));
  };

  goToViewport = ({ longitude, latitude }) => {
    this.onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };
  static PARKING_MARKERS = [
    { id: 1, title: 'AE8 - Free', latitude: 48.85, longitude: 2.35 },
    { id: 2, title: 'B11 - $5', latitude: 48.84, longitude: 2.36 },
    { id: 3, title: 'Super - $1', latitude: 48.80, longitude: 2.30 },
  ];

  render() {
    return (
      <div className={style.MapWrapper}>
        <MapGL
          {...this.state.viewport}
          width="100%"
          height="100%"
          mapStyle={Map.stylesUrl}
          onViewportChange={this.onViewportChange}
          dragToRotate={false}
          mapboxApiAccessToken={Map.mapToken}
        >
          {Map.PARKING_MARKERS.map(this.renderParkingMarker)}

          {this.renderParkingInfoPopup()}
        </MapGL>
        <ControlPanelCities
          onViewportChange={this.goToViewport}
        />
      </div>
    );
  }

  renderParkingMarker = (parking) => {
    return (
      <Marker
        key={parking.id}
        longitude={parking.longitude}
        latitude={parking.latitude}
      >
        <Pin
          size={20}
          onClick={(e) => console.log(this.state.popupInfo) || this.setState({popupInfo: parking})}
        />
      </Marker>
    );
  }

  closeParkingInfoPopup = () => {
    this.setState({ parking: null });
  };

  renderParkingInfoPopup() {
    const { parking } = this.state;

    return parking && (
      <Popup
        tipSize={5}
        anchor="top"
        longitude={parking.longitude}
        latitude={parking.latitude}
        closeOnClick={false}
        onClose={this.closeParkingInfoPopup}
      >
        <ParkingInfo parking={parking}/>
      </Popup>
    );
  }
}

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
