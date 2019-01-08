import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import { City } from '../../interfaces/City';
import Park4uMap from '../../components/Map/Map';
import Header from '../../components/Header/Header';
import ParkingsPage from '../ParkingsPage/ParkingsPage';
import { RootReducer } from '../../store/rootReducer';
import { configDomainSelector } from '../../store/BaseConfig/selectors';
import { BaseConfigState } from '../../store/BaseConfig/BaseConfigReducer';

import './App.global.css';
import * as styles from './App.module.css'


interface AppProps {
  config: BaseConfigState
}

interface AppState {
  centerLat: number,
  centerLon: number,
}

class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      centerLat: props.config.startPointLat,
      centerLon: props.config.startPointLon,
    };
  }

  changeLocation = (city: City) => {
    this.setState({
      centerLat: city.latitude,
      centerLon: city.longitude,
    })
  };

  render() {
    return (
      <main className={styles['App-container']}>
        { false && <Header/> }
        <Park4uMap
          changeLocation={this.changeLocation}
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
  }
}

export default connect(mapStateToProps)(App);
