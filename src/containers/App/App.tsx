import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { distance } from '@turf/turf';
import * as MapboxGl from 'mapbox-gl';
import { Redirect, Route, Switch, withRouter } from 'react-router';

import Park4uMap from '../../components/Map/Map';
import Header from '../../components/Header/Header';
import ParkingsPage from '../ParkingsPage/ParkingsPage';
import { RootReducer } from '../../store/rootReducer';
import { geoCoordinatesSelector, zoomLevelSelector } from '../ParkingsPage/ParkingsPageSelectors';
import { setParkingsPageCenter, setParkingsPageCenterActionCreator } from '../ParkingsPage/ParkingsPageActions';
import BaseConfigPage from '../BaseConfigPage/BaseConfigPage';

import * as css from './App.module.css';
import * as BaseConfigActions from '../BaseConfigPage/BaseConfigActions';
import * as ParkingsPageActions from '../ParkingsPage/ParkingsPageActions';


interface AppProps {
  zoomLevel: number,
  centerLatFromUrl: number,
  centerLonFromUrl: number,
  reCenter: setParkingsPageCenterActionCreator,
  setZoomLevel: ParkingsPageActions.setZoomLevelActionCreator,
  setSearchRadius: BaseConfigActions.setBaseConfigRadiusActionCreator,
}

export class App extends React.Component<AppProps> {

  recalculateSearchRadius(map: MapboxGl.Map) {
    const bounds = map.getBounds();
    const [northWest, center] = [bounds.getNorthWest(), bounds.getCenter()];

    const halfScreenDiagonal = distance(
      [northWest.lng, northWest.lat],
      [center.lng, center.lat],
      { units: 'meters' }
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
      <main className={css['AppContainer']}>
        <Header/>
        <Park4uMap
          reCenter={this.props.reCenter}
          centerLat={this.props.centerLatFromUrl}
          centerLon={this.props.centerLonFromUrl}
          onZoomEnd={this.onZoomEnd}
          onMapLoad={this.onMapLoad}
          zoomLevel={this.props.zoomLevel}
        >
          <Switch>
            <Route
              exact
              path="/config"
              // @ts-ignore
              component={BaseConfigPage}
            />
            <Route
              path="/parkings"
              // @ts-ignore
              component={ParkingsPage}
            />
            <Redirect
              exact
              path="/"
              to="/parkings"
            />
          </Switch>
        </Park4uMap>
      </main>
    );
  }
}


function mapStateToProps(state: RootReducer) {
  return {
    centerLatFromUrl: geoCoordinatesSelector(state).lat,
    centerLonFromUrl: geoCoordinatesSelector(state).lon,
    zoomLevel: zoomLevelSelector(state),
  };
}

const withConnect = connect(mapStateToProps, {
  reCenter: setParkingsPageCenter,
  setZoomLevel: ParkingsPageActions.setZoomLevel,
  setSearchRadius: BaseConfigActions.setSearchRadius,
});

export default compose(
  withRouter,
  withConnect,
)(App);
