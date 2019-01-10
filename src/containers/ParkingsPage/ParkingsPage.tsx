import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { RootReducer } from '../../store/rootReducer';
import { Parking } from '../../interfaces/Parking';
import { ParkingsLayer } from '../../components/LayerParkings/LayerParkings';
import {
  allParkingsSelector,
  centerCoordinatesSelector,
  isParkingFetchInProgressSelector,
} from './selectors';
import {
  fetchParkings,
  fetchParkingsActionCreator,
} from './ParkingsPageActions';
import Loader from '../../components/Loader/Loader';
import { searchRadiusSelector } from '../BaseConfigPage/selectors';
import './styles.css';


interface ParkingsPageProps {
  centerLat: number,
  centerLon: number,
  radius: number,
  allParkingsList: Parking[],
  fetchParkings: fetchParkingsActionCreator,
  isParkingFetchInProgress: boolean,
}

class ParkingsPage extends React.Component<ParkingsPageProps> {
  static defaultProps = {};

  componentDidMount(): void {
    this.props.fetchParkings();
  }

  render() {
    return (
      <React.Fragment>
        <div className="CenterMarker">
          {
            this.props.isParkingFetchInProgress
              ? <Loader/>
              : <div>[{this.props.centerLat.toFixed(2)}:{this.props.centerLon.toFixed(2)}, {this.props.radius}m]</div>
          }
        </div>
        <ParkingsLayer
          parkings={this.props.allParkingsList}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: RootReducer) {
  return {
    allParkingsList: allParkingsSelector(state),
    isParkingFetchInProgress: isParkingFetchInProgressSelector(state),
    centerLat: centerCoordinatesSelector(state).lat,
    centerLon: centerCoordinatesSelector(state).lon,
    radius: searchRadiusSelector(state),
  };
}

const withConnect = connect(mapStateToProps, {
  fetchParkings,
});

export default compose(
  withRouter,
  withConnect,
)(ParkingsPage);
