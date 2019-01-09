import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';

import Park4uMap from '../../components/Map/Map';
import Header from '../../components/Header/Header';
import ParkingsPage from '../ParkingsPage/ParkingsPage';
import { RootReducer } from '../../store/rootReducer';
import { configDomainSelector } from '../../store/BaseConfig/selectors';
import { BaseConfigState } from '../../store/BaseConfig/BaseConfigReducer';
import { geoCoordinatesSelector } from '../../store/ParkingsPage/selectors';
import {
  setParkingsPageCenter,
  setParkingsPageCenterActionCreator,
} from '../../store/ParkingsPage/ParkingsPageActions';

import './App.global.css';
import * as styles from './App.module.css';


interface AppProps {
  config: BaseConfigState,
  centerLatFromUrl: number,
  centerLonFromUrl: number,
  reCenter: setParkingsPageCenterActionCreator,
}

export class App extends React.PureComponent<AppProps> {
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
              path="/config"
              component={undefined}
            />
            <Route
              path="/parkings"
              // @ts-ignore
              component={ParkingsPage}
            />
            <Route
              path="/"
              // @ts-ignore
              component={ParkingsPage}
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

export default compose(
  connect(mapStateToProps, {
    reCenter: setParkingsPageCenter,
  }),
  withRouter,
)(App);
