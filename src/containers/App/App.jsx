import React from 'react';
import { Route, Switch } from 'react-router';

import Park4uMap from '../../components/Map/Map';
import Header from '../../components/Header/Header';
import ParkingsPage from '../ParkingsPage/ParkingsPage';

import * as styles from './App.module.css'
import './App.global.css';


function App() {
  return (
    <main className={styles['App-container']}>
      { false && <Header/> }
      <Park4uMap>
        <Switch>
          <Route
            path="/config"
            component={null}
          />
          <Route
            path="/"
            component={ParkingsPage}
          />
        </Switch>
      </Park4uMap>
    </main>
  );
}

export default App;
