import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { RootReducer } from '../../store/rootReducer';
import { ResponseParkings } from '../../interfaces/ResponseParkings';
import { initialState } from '../../store/BaseConfig/BaseConfigReducer';
import { ParkingsLayer } from '../../components/LayerParkings/LayerParkings';
import { geoCoordinatesSelector } from '../../store/ParkingsPage/selectors';


interface ParkingsPageProps {
  centerLatFromUrl: number,
  centerLonFromUrl: number,
  centerLatFromMapView: number,
  centerLonFromMapView: number,
  radius: number,
}


class ParkingsPage extends React.Component<ParkingsPageProps> {
  static defaultProps = {
    centerLatFromUrl: initialState.startPointLat,
    centerLonFromUrl: initialState.startPointLon,
  };

  state = {
    parkings: [],
  };

  requestParkings() {
    fetch('http://34.247.51.123/area/update', {
      method: 'POST',
      body: JSON.stringify({
        lat: this.props.centerLatFromUrl,
        lon: this.props.centerLonFromUrl,
        radius: this.props.radius,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((data: ResponseParkings) => {
        const parkings = data.allParkings.map(parking => ({
          ...parking,
          parkingGeometry: parking.parkingGeometry.map(point => point.reverse()),
        }));
        this.setState({
          parkings,
        })
      })
      .catch(console.error)
  }

  updateCenterIfMapMoved() {
    const {
      centerLatFromUrl,
      centerLonFromUrl,
      centerLatFromMapView,
      centerLonFromMapView,
    } = this.props;
    console.log('props', this.props);
    const isMapMoved = centerLatFromMapView !== centerLatFromUrl || centerLonFromMapView !== centerLonFromUrl;
    const isMapCenterExist = Boolean(centerLatFromMapView && centerLonFromMapView);

    if (isMapCenterExist && isMapMoved) {
      this.props['history'].push(`/?lat=${centerLatFromMapView}&lon=${centerLonFromMapView}`);
    }
  }

  componentDidMount(): void {
    this.updateCenterIfMapMoved();
    this.requestParkings();
  }

  componentWillReceiveProps(nextProps: Readonly<ParkingsPageProps>, nextContext: any): void {
    this.updateCenterIfMapMoved();
    this.requestParkings();
  }

  render() {
    return (
      <React.Fragment>
        <ParkingsLayer
          parkings={this.state.parkings}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: RootReducer) {
  return {
    radius: state.config.parkingSearchRadius,
    centerLatFromUrl: geoCoordinatesSelector(state).lat,
    centerLonFromUrl: geoCoordinatesSelector(state).lon,
  };
}

const withConnect = connect(mapStateToProps);

export default compose(
  withRouter,
  withConnect,
)(ParkingsPage);