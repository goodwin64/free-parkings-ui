import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router';

// import { City } from '../../interfaces/City';
import Park4uMap from '../../components/Map/Map';
import Header from '../../components/Header/Header';
import ParkingsPage from '../ParkingsPage/ParkingsPage';
import { RootReducer } from '../../store/rootReducer';
import { configDomainSelector } from '../../store/BaseConfig/selectors';
import { BaseConfigState } from '../../store/BaseConfig/BaseConfigReducer';

import './App.global.css';
import * as styles from './App.module.css';


interface AppProps {
  config: BaseConfigState
}

interface AppState {
  centerLat: number,
  centerLon: number,
}

export class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      centerLat: props.config.startPointLat,
      centerLon: props.config.startPointLon,
    };
  }

  changeLocationCenter = (lat: number, lon: number) => {
    this.props['history'].push(`/?lat=${lat}&lon=${lon}`);
    this.setState({
      centerLat: lat,
      centerLon: lon,
    });
  };

  render() {
    return (
      <main className={styles['App-container']}>
        { false && <Header/> }
        <Park4uMap
          reCenter={this.changeLocationCenter}
          centerLat={this.state.centerLat}
          centerLon={this.state.centerLon}
        >
          <Switch>
            <Route
              path="/config"
              component={undefined}
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
  };
}

export default compose(
  connect(mapStateToProps),
  withRouter,
)(App);
