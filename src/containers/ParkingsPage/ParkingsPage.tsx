import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ScaleControl } from 'react-mapbox-gl';

import { Parking } from '../../interfaces/Parking';
import Loader from '../../components/Loader/Loader';
import { RootReducer } from '../../store/rootReducer';
import { RouterProps } from '../../interfaces/RouterProps';
import * as ParkingsPageActions from './ParkingsPageActions';
import * as ParkingsPageSelectors from './ParkingsPageSelectors';
import { searchRadiusSelector } from '../BaseConfigPage/selectors';
import withMap, { MapContextProps } from '../../components/Map/context';
import { ParkingsLayer } from '../../components/LayerParkings/LayerParkings';

import './styles.css';
import CursorMapCenter from '../../components/CursorMapCenter/CursorMapCenter';


interface ParkingsPageOwnProps {
  centerLat: number,
  centerLon: number,
  radius: number,
  allParkingsList: Parking[],
  fetchParkings: ParkingsPageActions.fetchParkingsActionCreator,
  synchronizeLatLon: ParkingsPageActions.synchronizeLatLonActionCreator,
  isParkingFetchInProgress: boolean,
}

interface ParkingsPageProps extends ParkingsPageOwnProps, RouterProps, MapContextProps {
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
              : <CursorMapCenter {...this.props}/>
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
        <ScaleControl/>
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
  withMap,
)(ParkingsPage);
