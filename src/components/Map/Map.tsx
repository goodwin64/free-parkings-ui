import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

import * as style from './Map.module.css';
import ControlPanelCities from '../ControlPanel';


interface Park4uMapState {
  center: [number, number],
  zoom: [number],
}

interface Park4uMapProps {
  children?: any,
}

export interface City {
  title: string,
  latitude: number,
  longitude: number,
}

class Park4uMap extends React.PureComponent<Park4uMapProps, Park4uMapState> {
  static mapToken = 'pk.eyJ1IjoiY2xvdWRtYWRlIiwiYSI6ImNqcG56a3VoZTA0dTc0OHF0d21rOTk0eHoifQ.sB4G-WjZ1JdB_fqAaPeULQ';
  static stylesUrl = 'mapbox://styles/mapbox/dark-v9';

  static propTypes = {};

  static defaultProps = {};

  static mapStyle = {
    width: '100%',
    height: '100%',
  };

  constructor(props: Park4uMapProps) {
    super(props);
    this.state = {
      center: [2.3522, 48.8566],
      zoom: [7],
    };
  }

  changeLocation = (city: City) => {
    console.log('city', city);
    this.setState({
      center: [city.longitude, city.latitude],
      zoom: [7],
    })
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
