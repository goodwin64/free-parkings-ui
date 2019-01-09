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
} from '../../store/ParkingsPage/selectors';
import {
  fetchParkings,
  fetchParkingsActionCreator,
} from '../../store/ParkingsPage/ParkingsPageActions';
import Loader from '../../components/Loader/Loader';
import { searchRadiusSelector } from '../../store/BaseConfig/selectors';
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

  updateCenterIfMapMoved() {
    const {
      centerLat,
      centerLon,
    } = this.props;

    this.props['history'].push(`/parkings?lat=${centerLat}&lon=${centerLon}`);
  }

  componentDidMount(): void {
    this.updateCenterIfMapMoved();
    this.props.fetchParkings();
  }

  componentWillReceiveProps(nextProps: Readonly<ParkingsPageProps>, nextContext: any): void {
    this.updateCenterIfMapMoved();
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
