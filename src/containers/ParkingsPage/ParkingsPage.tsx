import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { RootReducer } from '../../store/rootReducer';
import { Parking } from '../../interfaces/Parking';
import { ParkingsLayer } from '../../components/LayerParkings/LayerParkings';
import * as ParkingsPageSelectors from './ParkingsPageSelectors';
import * as ParkingsPageActions from './ParkingsPageActions';
import Loader from '../../components/Loader/Loader';
import { searchRadiusSelector } from '../BaseConfigPage/selectors';
import './styles.css';


interface ParkingsPageProps {
  centerLat: number,
  centerLon: number,
  radius: number,
  allParkingsList: Parking[],
  fetchParkings: ParkingsPageActions.fetchParkingsActionCreator,
  synchronizeLatLon: ParkingsPageActions.synchronizeLatLonActionCreator,
  isParkingFetchInProgress: boolean,
}

class ParkingsPage extends React.Component<ParkingsPageProps> {
  static defaultProps = {};

  componentDidMount(): void {
    this.props.synchronizeLatLon();
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
        <Link
          to="/config"
          style={{ position: 'absolute', left: 0, bottom: 0 }}
        >
          <button>⚙️</button>
        </Link>
        <ParkingsLayer
          parkings={this.props.allParkingsList}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: RootReducer) {
  return {
    allParkingsList: ParkingsPageSelectors.allParkingsSelector(state),
    isParkingFetchInProgress: ParkingsPageSelectors.isParkingFetchInProgressSelector(state),
    centerLat: ParkingsPageSelectors.centerCoordinatesSelector(state).lat,
    centerLon: ParkingsPageSelectors.centerCoordinatesSelector(state).lon,
    radius: searchRadiusSelector(state),
  };
}

const withConnect = connect(mapStateToProps, {
  fetchParkings: ParkingsPageActions.fetchParkings,
  synchronizeLatLon: ParkingsPageActions.synchronizeLatLon,
});

export default compose(
  withRouter,
  withConnect,
)(ParkingsPage);
