import React from 'react';
import PropTypes from 'prop-types';
import * as MapboxGl from 'mapbox-gl';
import ReactMapboxGl, { Layer } from 'react-mapbox-gl';

import Loader from '../Loader/Loader';
import { MapContext } from './context';
import * as style from './Map.module.css';
import * as ParkingsPageActions from '../../store/parkings/actions';
import { DEFAULT_ZOOM_LEVEL } from '../../containers/BaseConfigPage/BaseConfigConstants';


interface Park4uMapState {
  center: [number, number],
  // don't use number primitive for this purpose - internal "react-mapbox-gl" optimizations
  zoomLevel: [number];
  MapboxMapRef: (MapboxGl.Map | null),
}

interface Park4uMapProps {
  children?: any,
  reCenter: ParkingsPageActions.setParkingsPageCenterActionCreator,
  onZoomEnd: (map: MapboxGl.Map) => void,
  onMapLoad: (map: MapboxGl.Map) => void,
  centerLat: number,
  centerLon: number,
  zoomLevel: number,
}

class Park4uMap extends React.PureComponent<Park4uMapProps, Park4uMapState> {
  static mapToken = 'pk.eyJ1IjoiY2xvdWRtYWRlIiwiYSI6ImNqcG56a3VoZTA0dTc0OHF0d21rOTk0eHoifQ.sB4G-WjZ1JdB_fqAaPeULQ';
  static stylesUrl = 'mapbox://styles/mapbox/dark-v9';

  static propTypes = {
    reCenter: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  static mapStyle = {
    width: '100%',
    height: '100%',
  };

  static paintLayer = {
    'fill-extrusion-color': '#aaa',
    'fill-extrusion-height': {
      type: 'identity' as 'identity',
      property: 'height'
    },
    'fill-extrusion-base': {
      type: 'identity' as 'identity',
      property: 'min_height'
    },
    'fill-extrusion-opacity': 0.6
  };

  constructor(props: Park4uMapProps) {
    super(props);
    this.state = {
      center: [props.centerLon, props.centerLat],
      zoomLevel: [DEFAULT_ZOOM_LEVEL],
      MapboxMapRef: null,
    };
  }

  componentWillReceiveProps(nextProps: Readonly<Park4uMapProps>, nextContext: any): void {
    const isMapCenterChanged = this.props.centerLat !== nextProps.centerLat || this.props.centerLon !== nextProps.centerLon;
    if (isMapCenterChanged) {
      this.setState({
        center: [nextProps.centerLon, nextProps.centerLat],
      });
    }
    const isZoomLevelChanged = this.props.zoomLevel !== nextProps.zoomLevel;
    if (isZoomLevelChanged) {
      this.setState({
        zoomLevel: [nextProps.zoomLevel],
      });
    }
  }

  onMoveEnd = (map: MapboxGl.Map) => {
    const { lat, lng: lon } = map.getCenter();
    this.props.reCenter(lat, lon);
  };

  onMapLoad = (map: MapboxGl.Map) => {
    this.setState(() => ({ MapboxMapRef: map }));
    this.props.onMapLoad(map);
  };

  onZoomEnd = (map: MapboxGl.Map) => {
    this.props.onZoomEnd(map);
  };

  render() {
    return (
      <div className={style['MapWrapper']}>
        <MapboxMap
          style={Park4uMap.stylesUrl}
          containerStyle={Park4uMap.mapStyle}
          center={this.state.center}
          zoom={this.state.zoomLevel}
          onMoveEnd={this.onMoveEnd}
          onStyleLoad={this.onMapLoad}
          onZoomEnd={this.onZoomEnd}
        >
          <MapContext.Provider value={this.state.MapboxMapRef}>
            {this.state.MapboxMapRef ? this.props.children : <Loader/>}
            <Layer
              id="3d-buildings"
              sourceId="composite"
              sourceLayer="building"
              filter={['==', 'extrude', 'true']}
              type="fill-extrusion"
              minZoom={14}
              paint={Park4uMap.paintLayer}
            />
          </MapContext.Provider>
        </MapboxMap>
      </div>
    );
  }
}

const MapboxMap = ReactMapboxGl({
  accessToken: Park4uMap.mapToken,
});

export default Park4uMap;
