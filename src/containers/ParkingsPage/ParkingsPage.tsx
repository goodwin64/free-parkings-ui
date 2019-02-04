import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { ScaleControl } from 'react-mapbox-gl';

import { Place } from '../../interfaces/Place';
import Park4uMap from '../../components/Map/Map';
import Search from '../../components/Search/Search';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import { RootReducer } from '../../store/rootReducer';
import { MapboxPlace } from '../../interfaces/MapboxPlace';
import { RouterProps } from '../../interfaces/RouterProps';
import { FreeParking } from '../../interfaces/FreeParking';
import { ParkopediaParking } from '../../interfaces/Parking';
import * as ParkingsPageActions from './ParkingsPageActions';
import * as ParkingsPageSelectors from './ParkingsPageSelectors';
import { searchRadiusSelector } from '../BaseConfigPage/selectors';
import withMap, { MapContextProps } from '../../components/Map/context';
import CursorMapCenter from '../../components/CursorMapCenter/CursorMapCenter';
import ParkingsLayer, { openPopup } from '../../components/LayerParkings/LayerParkings';
import SelectedParkingPopup from '../../components/SelectedParkingPopup/SelectedParkingPopup';

import * as styles from './styles.module.css';


const req = (url: string, body?: any, method = 'GET') =>
  new Request(url, {
    method,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Charset': 'utf-8',
    }),
    body,
  });

const geocodingUrl = 'https://api.mapbox.com/geocoding/v5';
const mapboxGeocoding = (query: string) =>
  `${geocodingUrl}/mapbox.places/${encodeURIComponent(query)}.json?access_token=${Park4uMap.mapToken}`;

interface ParkingsPageOwnProps {
  centerLat: number,
  centerLon: number,
  radius: number,
  allParkingsList: ParkopediaParking[],
  freeParkingsList: FreeParking[],
  fetchParkings: ParkingsPageActions.fetchParkingsStartActionCreator,
  synchronizeLatLon: ParkingsPageActions.synchronizeLatLonActionCreator,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenterActionCreator,
  isParkingFetchInProgress: boolean,
}

interface ParkingsPageProps extends ParkingsPageOwnProps, RouterProps, MapContextProps {
}

interface ParkingsPageState {
  query: string;
  options: Place[];
  selected?: Place;
  center: [number, number];
  selectedParking: ParkopediaParking | null,
}

class ParkingsPage extends React.Component<ParkingsPageProps, ParkingsPageState> {
  static defaultProps = {};

  constructor(props: ParkingsPageProps) {
    super(props);
    this.state = {
      query: '',
      options: [],
      selected: undefined,
      selectedParking: null,
      center: [props.MapboxMap.getCenter().lng, props.MapboxMap.getCenter().lat],
    };
  }

  componentDidMount(): void {
    this.props.synchronizeLatLon();
    setInterval(() => {
      this.props.fetchParkings();
    }, 10000);
  }

  private fetchPlaces = (query: string) => {
    fetch(req(mapboxGeocoding(query)))
      .then((res: any) => res.json())
      .then((data: any) => {
        if (data.features.length === 0) {
          return;
        }
        this.setState({
          options: data.features
            .map((place: MapboxPlace) => ({
              id: place.id,
              center: place.center,
              name: place.place_name,
            })),
        });
      })
      .catch(console.error);
  };

  private onSelectItem = (index: number) => {
    const selected = this.state.options[index];
    const [selectedLon, selectedLat] = selected.center;
    this.props.setParkingsPageCenter(selectedLat, selectedLon);
    this.setState({
      selected,
      center: selected.center,
    });
  };

  private onPoiSearch = (query: string) => {
    this.setState({ query });
    this.fetchPlaces(query);
  };

  private onLatLonSearch = (lat: number, lon: number) => {
    this.props.setParkingsPageCenter(lat, lon);
  };

  openPopup: openPopup = (parking: ParkopediaParking) => {
    this.setState({ selectedParking: parking });
  };

  closePopup = () => {
    this.setState({ selectedParking: null });
  };

  render() {
    return (
      <React.Fragment>
        <Search
          onPoiSearch={this.onPoiSearch}
          onSelectItem={this.onSelectItem}
          options={this.state.options}
          onLatLonSearch={this.onLatLonSearch}
        />
        <div className={styles['CenterMarker']}>
          {
            this.props.isParkingFetchInProgress
              ? <Loader/>
              : <CursorMapCenter {...this.props}/>
          }
        </div>
        <div
          className={styles['GetParkingsButtonContainer']}
        >
          <Button
            onClick={this.props.fetchParkings}
            disabled={this.props.isParkingFetchInProgress}
          >
            GET PARKINGS
          </Button>
        </div>
        <ParkingsLayer
          parkings={this.props.allParkingsList}
          freeParkings={this.props.freeParkingsList}
          zoomLevel={this.props.MapboxMap.getZoom()}
          openPopup={this.openPopup}
          closePopup={this.closePopup}
        />
        <SelectedParkingPopup
          selectedParking={this.state.selectedParking}
          closePopup={this.closePopup}
        />
        <ScaleControl/>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: RootReducer) {
  return {
    allParkingsList: ParkingsPageSelectors.allParkingsSelector(state),
    freeParkingsList: ParkingsPageSelectors.freeParkingsSelector(state),
    isParkingFetchInProgress: ParkingsPageSelectors.isParkingFetchInProgressSelector(state),
    centerLat: ParkingsPageSelectors.centerCoordinatesSelector(state).lat,
    centerLon: ParkingsPageSelectors.centerCoordinatesSelector(state).lon,
    radius: searchRadiusSelector(state),
  };
}

const withConnect = connect(mapStateToProps, {
  fetchParkings: ParkingsPageActions.fetchParkingsStart,
  synchronizeLatLon: ParkingsPageActions.synchronizeLatLon,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenter,
});

export default compose(
  withRouter,
  withConnect,
  withMap,
)(ParkingsPage);
