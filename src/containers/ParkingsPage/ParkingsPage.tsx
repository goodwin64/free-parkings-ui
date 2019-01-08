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

  componentDidUpdate(prevProps: Readonly<ParkingsPageProps>, prevState: Readonly<{}>, snapshot?: any): void {
    setTimeout(() => this.requestParkings(), 5000);
  }

  componentDidMount(): void {
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