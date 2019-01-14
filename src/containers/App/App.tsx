import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router';

import Park4uMap from '../../components/Map/Map';
import Header from '../../components/Header/Header';
import ParkingsPage from '../ParkingsPage/ParkingsPage';
import { RootReducer } from '../../store/rootReducer';
import { configDomainSelector } from '../BaseConfigPage/selectors';
import { geoCoordinatesSelector } from '../ParkingsPage/ParkingsPageSelectors';
import { BaseConfigState } from '../BaseConfigPage/BaseConfigReducer';
import { setParkingsPageCenter, setParkingsPageCenterActionCreator } from '../ParkingsPage/ParkingsPageActions';
import BaseConfigPage from '../BaseConfigPage/BaseConfigPage';

import './App.global.css';
import * as styles from './App.module.css';


interface AppProps {
  config: BaseConfigState,
  centerLatFromUrl: number,
  centerLonFromUrl: number,
  reCenter: setParkingsPageCenterActionCreator,
}

export class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      centerLat: props.config.startPointLat,
      centerLon: props.config.startPointLon,
    };
  }

  render() {
    return (
      <main className={styles['App-container']}>
        {false && <Header/>}
        <Park4uMap
          reCenter={this.props.reCenter}
          centerLat={this.props.centerLatFromUrl}
          centerLon={this.props.centerLonFromUrl}
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
    config: configDomainSelector(state),
    centerLatFromUrl: geoCoordinatesSelector(state).lat,
    centerLonFromUrl: geoCoordinatesSelector(state).lon,
  };
}

const withConnect = connect(mapStateToProps, {
  reCenter: setParkingsPageCenter,
});

export default compose(
  withRouter,
  withConnect,
)(App);
