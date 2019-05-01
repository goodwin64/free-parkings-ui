import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as MapboxGl from 'mapbox-gl';
import { distance } from '@turf/turf';
import { withRouter } from 'react-router';
import { ZoomControl } from 'react-mapbox-gl';
import { createStructuredSelector } from 'reselect';

import { Place } from '../../interfaces/Place';
import Park4uMap from '../../components/Map/Map';
import Search from '../../components/Search/Search';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import { RootReducer } from '../../store/rootReducer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { MapboxPlace } from '../../interfaces/MapboxPlace';
import { RouterProps } from '../../interfaces/RouterProps';
import { FreeParking } from '../../interfaces/FreeParking';
import { ParkopediaParking } from '../../interfaces/ParkopediaParking';
import * as ParkingsPageActions from '../../store/parkings/actions';
import * as ParkingsPageSelectors from '../../store/parkings/selectors';
import withMap, { MapContextProps } from '../../components/Map/context';
import * as BaseConfigActions from '../BaseConfigPage/BaseConfigActions';
import * as BaseConfigSelectors from '../BaseConfigPage/BaseConfigSelectors';
import CursorMapCenter from '../../components/CursorMapCenter/CursorMapCenter';
import ParkingsLayer, { openPopup } from '../../components/LayerParkings/LayerParkings';
import SelectedParkingPopup from '../../components/SelectedParkingPopup/SelectedParkingPopup';
import { MAX_SEARCH_RADIUS_TO_FETCH, DEFAULT_ZOOM_LEVEL } from '../BaseConfigPage/BaseConfigConstants';

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
  isParkingFetchInProgress: boolean,
  isSearchRadiusTooBig: boolean,
  wasFetchPerformedOnce: boolean,
  isSidebarOpen: boolean,
  zoomLevel: number,
}

interface ParkingsPageDispatchProps {
  openSidebar: BaseConfigActions.openSidebarActionCreator,
  closeSidebar: BaseConfigActions.closeSidebarActionCreator,
  setZoomLevel: ParkingsPageActions.setZoomLevelActionCreator,
  fetchParkings: ParkingsPageActions.fetchParkingsRequestActionCreator,
  setSearchRadius: BaseConfigActions.setSearchRadiusActionCreator,
  synchronizeLatLon: ParkingsPageActions.synchronizeLatLonActionCreator,
  clearAllFreeSlots: ParkingsPageActions.clearAllFreeSlotsActionCreator,
  clearVisibleFreeSlots: ParkingsPageActions.clearVisibleFreeSlotsActionCreator,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenterActionCreator,
  checkParkopediaUpdates: ParkingsPageActions.checkParkopediaUpdatesRequestActionCreator,
  askPermissionForGeoLocation: ParkingsPageActions.askPermissionForGeoLocationActionCreator,
}

interface ParkingsPageProps extends ParkingsPageOwnProps, ParkingsPageDispatchProps, RouterProps, MapContextProps {
}

interface ParkingsPageState {
  query: string;
  options: Place[];
  selected?: Place;
  selectedParking: ParkopediaParking | FreeParking | null,
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
    };
  }

  componentDidMount(): void {
    this.props.synchronizeLatLon();
    this.props.fetchParkings();
    this.props.askPermissionForGeoLocation();
    // setInterval(() => {
    //   this.props.checkParkopediaUpdates();
    // }, 5000);
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
    this.props.setZoomLevel(DEFAULT_ZOOM_LEVEL);
    this.setState(() => ({ selected }));
  };

  private onPoiSearch = (query: string) => {
    this.setState({ query });
    this.fetchPlaces(query);
  };

  private onLatLonSearch = (lat: number, lon: number) => {
    this.props.setParkingsPageCenter(lat, lon);
    this.props.setZoomLevel(DEFAULT_ZOOM_LEVEL);
  };

  openPopup: openPopup = (parking: ParkopediaParking | FreeParking) => {
    this.setState({ selectedParking: parking });
  };

  closePopup = () => {
    this.setState({ selectedParking: null });
  };

  recalculateSearchRadius(map: MapboxGl.Map) {
    const bounds = map.getBounds();
    const [northWest, center] = [bounds.getNorthWest(), bounds.getCenter()];

    const halfScreenDiagonal = distance(
      [northWest.lng, northWest.lat],
      [center.lng, center.lat],
      { units: 'meters' },
    );
    const searchRadius = Math.floor(halfScreenDiagonal);
    this.props.setSearchRadius(searchRadius);
  }

  onZoomEnd = (map: MapboxGl.Map) => {
    this.recalculateSearchRadius(map);
    this.props.setZoomLevel(map.getZoom());
  };

  onMapLoad = (map: MapboxGl.Map) => {
    this.recalculateSearchRadius(map);
  };

  renderNoParkingsWarning() {
    return (
      this.props.wasFetchPerformedOnce
      && this.props.radius < MAX_SEARCH_RADIUS_TO_FETCH
      && !this.props.isParkingFetchInProgress
      && this.props.allParkingsList.length === 0
      && (
        <h3 className={styles['NoParkingsWarning']}>
          No parkings nearby<br/>
          Try to get parkings for another location
        </h3>
      )
    );
  }

  renderControlButtons() {
    return (
      <div
        className={styles['ParkingsControlButtonsContainer']}
      >
        <Button
          onClick={this.props.fetchParkings}
          disabled={this.props.isParkingFetchInProgress || this.props.isSearchRadiusTooBig}
          className={styles['LoadParkingsButton']}
          withRoundedCorners
        >
          Load parkings
        </Button>
      </div>
    );
  }

  render() {
    return (
      <Park4uMap
        reCenter={this.props.setParkingsPageCenter}
        centerLat={this.props.centerLat}
        centerLon={this.props.centerLon}
        onZoomEnd={this.onZoomEnd}
        onMapLoad={this.onMapLoad}
        zoomLevel={this.props.zoomLevel}
      >
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
              : <CursorMapCenter isSearchRadiusTooBig={this.props.isSearchRadiusTooBig}/>
          }
          {this.renderNoParkingsWarning()}
        </div>
        {this.renderControlButtons()}
        <ParkingsLayer
          parkings={this.props.allParkingsList}
          freeParkings={this.props.freeParkingsList}
          zoomLevel={this.props.zoomLevel}
          openPopup={this.openPopup}
          closePopup={this.closePopup}
        />
        <SelectedParkingPopup
          selectedParking={this.state.selectedParking}
          closePopup={this.closePopup}
        />
        <Sidebar
          isOpen={this.props.isSidebarOpen}
          openSidebar={this.props.openSidebar}
          closeSidebar={this.props.closeSidebar}
        >
          <Button
            onClick={this.props.clearAllFreeSlots}
            className={styles['ClearAllFreeSlotsButton']}
          >
            Clear All Free Slots
          </Button>

          <Button
            onClick={this.props.clearVisibleFreeSlots}
            className={styles['ClearVisibleFreeSlotsButton']}
          >
            Clear Visible Free Slots
          </Button>
        </Sidebar>
        <ZoomControl
          position="bottom-right"
        />
      </Park4uMap>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, ParkingsPageOwnProps>({
  radius: BaseConfigSelectors.searchRadiusSelector,
  zoomLevel: ParkingsPageSelectors.zoomLevelSelector,
  isSidebarOpen: BaseConfigSelectors.isSidebarOpenSelector,
  allParkingsList: ParkingsPageSelectors.allParkingsSelector,
  freeParkingsList: ParkingsPageSelectors.freeParkingsSelector,
  centerLat: ParkingsPageSelectors.centerCoordinatesLatitudeSelector,
  centerLon: ParkingsPageSelectors.centerCoordinatesLongitudeSelector,
  isSearchRadiusTooBig: BaseConfigSelectors.isSearchRadiusTooBigSelector,
  wasFetchPerformedOnce: ParkingsPageSelectors.wasFetchPerformedSelector,
  isParkingFetchInProgress: ParkingsPageSelectors.isParkingFetchInProgressSelector,
});

const withConnect = connect(mapStateToProps, {
  openSidebar: BaseConfigActions.openSidebar,
  closeSidebar: BaseConfigActions.closeSidebar,
  setZoomLevel: ParkingsPageActions.setZoomLevel,
  setSearchRadius: BaseConfigActions.setSearchRadius,
  fetchParkings: ParkingsPageActions.fetchParkingsRequest,
  synchronizeLatLon: ParkingsPageActions.synchronizeLatLon,
  clearAllFreeSlots: ParkingsPageActions.clearAllFreeSlots,
  clearVisibleFreeSlots: ParkingsPageActions.clearVisibleFreeSlots,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenter,
  checkParkopediaUpdates: ParkingsPageActions.checkParkopediaUpdatesRequest,
  askPermissionForGeoLocation: ParkingsPageActions.askPermissionForGeoLocation,
});

export default compose(
  withRouter,
  withConnect,
  withMap,
)(ParkingsPage);
