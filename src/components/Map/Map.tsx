import React from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';

import * as style from './Map.module.css';
import ControlPanelCities from '../ControlPanel';
import { City } from '../../interfaces/City';


interface Park4uMapState {
  center: [number, number],
  zoom: [number],
}

interface Park4uMapProps {
  children?: any,
  changeLocation: (city: City) => void,
  centerLat: number,
  centerLon: number,
}

class Park4uMap extends React.PureComponent<Park4uMapProps, Park4uMapState> {
  static mapToken = 'pk.eyJ1IjoiY2xvdWRtYWRlIiwiYSI6ImNqcG56a3VoZTA0dTc0OHF0d21rOTk0eHoifQ.sB4G-WjZ1JdB_fqAaPeULQ';
  static stylesUrl = 'mapbox://styles/mapbox/dark-v9';

  static propTypes = {
    changeLocation: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  static mapStyle = {
    width: '100%',
    height: '100%',
  };

  constructor(props: Park4uMapProps) {
    super(props);
    this.state = {
      center: [props.centerLon, props.centerLat],
      zoom: [7],
    };
  }

  componentWillReceiveProps(nextProps: Readonly<Park4uMapProps>, nextContext: any): void {
    const isMapCenterChanged = this.props.centerLat !== nextProps.centerLat || this.props.centerLon !== nextProps.centerLon;
    if (isMapCenterChanged) {
      this.setState({
        center: [nextProps.centerLon, nextProps.centerLat],
      });
    }
  }

  changeLocation = (city: City) => {
    this.props.changeLocation(city);
  };

  render() {
    return (
      <div className={style['MapWrapper']}>
        <MapboxMap
          style={Park4uMap.stylesUrl}
          containerStyle={Park4uMap.mapStyle}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          {this.props.children}
        </MapboxMap>
        <ControlPanelCities
          onCityChange={this.changeLocation}
        />
      </div>
    );
  }
}

const MapboxMap = ReactMapboxGl({
  accessToken: Park4uMap.mapToken,
});

export default Park4uMap;
