import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as MapboxGl from 'mapbox-gl';
import distance from '@turf/distance';
import { ZoomControl } from 'react-mapbox-gl';
import { createStructuredSelector } from 'reselect';

import Park4uMap from '../../components/Map/Map';
import { RootReducer } from '../../store/rootReducer';
import * as ParkingsPageActions from '../../store/parkings/actions';
import * as ParkingsPageSelectors from '../../store/parkings/selectors';
import * as BaseConfigActions from '../BaseConfigPage/BaseConfigActions';
import GeoLocationControl from '../../widgets/GeoLocationControl/GeoLocationControl';


interface ParkingsMapOwnProps {
  centerLat: number,
  centerLon: number,
  zoomLevel: number,
}

interface ParkingsMapDispatchProps {
  setZoomLevel: ParkingsPageActions.setZoomLevelActionCreator,
  setSearchRadius: BaseConfigActions.setSearchRadiusActionCreator,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenterActionCreator,
}

interface ParkingsMapProps extends ParkingsMapOwnProps, ParkingsMapDispatchProps {}

class ParkingsMap extends React.PureComponent<ParkingsMapProps> {
  recalculateSearchRadius(map: MapboxGl.Map) {
    const bounds = map.getBounds();
    const [northWest, center] = [bounds.getNorthWest(), bounds.getCenter()];

    const halfScreenDiagonal = distance(
      [northWest.lng, northWest.lat],
      [center.lng, center.lat],
      { units: 'meters' },
    );
    const searchRadius = Math.floor(halfScreenDiagonal);
    this.props.setSearchRadius(searchRadius);
  }

  onZoomEnd = (map: MapboxGl.Map) => {
    this.recalculateSearchRadius(map);
    this.props.setZoomLevel(map.getZoom());
  };

  onMapLoad = (map: MapboxGl.Map) => {
    this.recalculateSearchRadius(map);
  };

  render() {
    return (
      <Park4uMap
        reCenter={this.props.setParkingsPageCenter}
        centerLat={this.props.centerLat}
        centerLon={this.props.centerLon}
        onZoomEnd={this.onZoomEnd}
        onMapLoad={this.onMapLoad}
        zoomLevel={this.props.zoomLevel}
      >
        {this.props.children}
        <GeoLocationControl/>
        <ZoomControl
          position="bottom-right"
        />
      </Park4uMap>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, ParkingsMapOwnProps>({
  zoomLevel: ParkingsPageSelectors.zoomLevelSelector,
  centerLat: ParkingsPageSelectors.centerCoordinatesLatitudeSelector,
  centerLon: ParkingsPageSelectors.centerCoordinatesLongitudeSelector,
});

const mapDispatchToProps: ParkingsMapDispatchProps = {
  setZoomLevel: ParkingsPageActions.setZoomLevel,
  setSearchRadius: BaseConfigActions.setSearchRadius,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenter,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ParkingsMap);
