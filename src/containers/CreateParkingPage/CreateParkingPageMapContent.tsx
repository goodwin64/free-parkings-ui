import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../../components/Button/Button';
import { RootReducer } from '../../store/rootReducer';
import * as ParkingsPageActions from '../../store/parkings/actions';
import InputNumber from '../../components/TextFieldInput/InputNumber';
import withMap, { MapContextProps } from '../../components/Map/context';
import * as ParkingsPageSelectors from '../../store/parkings/selectors';
import * as BaseConfigActions from '../BaseConfigPage/BaseConfigActions';
import ToggleSwitch, { ToggleSwitchColorScheme3 } from '../../components/ToggleSwitch/ToggleSwitch';
import * as styled from './CreateParkingPageMapContent.styled';


interface CreateParkingPageOwnProps {
  centerLat: number,
  centerLon: number,
  zoomLevel: number,
}

interface CreateParkingPageDispatchProps {
  createParking: ParkingsPageActions.createParkingActionCreator,
  setZoomLevel: ParkingsPageActions.setZoomLevelActionCreator,
  setSearchRadius: BaseConfigActions.setSearchRadiusActionCreator,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenterActionCreator,
}

interface CreateParkingPageProps extends CreateParkingPageOwnProps,
  CreateParkingPageDispatchProps,
  MapContextProps {
}

const textareaLatLonPlaceholder = `lat1, lon1
lat2, lon2
...
latN, lonN`;

const textareaLonLatPlaceholder = `lon1, lat1
lon2, lat2
...
lonN, latN`;

function CreateParkingPageMapContent(props: CreateParkingPageProps) {
  const [parkingsGeoJsonSource, setParkingsGeoJsonSource] = React.useState('');
  const [isLatLon, setIsLatLon] = React.useState(false);
  const [parkingLength, setParkingLength] = React.useState(0);
  const [parkingWidth, setParkingWidth] = React.useState(0);
  const [parkingHeight, setParkingHeight] = React.useState(0);

  const onParkingsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParkingsGeoJsonSource(e.target.value);
  };

  const onParkingsAdd = () => {
    props.createParking({
      parkingsGeoJsonSource,
      isLatLon,
      parkingLength,
      parkingWidth,
      parkingHeight,
    });
  };

  const toggleIsLatLon = () => setIsLatLon(!isLatLon);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onParkingLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => setParkingLength(e.target.valueAsNumber);
  const onParkingWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => setParkingWidth(e.target.valueAsNumber);
  const onParkingHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => setParkingHeight(e.target.valueAsNumber);

  return (
    <React.Fragment>
      <styled.CreateParkingForm onSubmit={onFormSubmit}>
        <styled.CreateParkingHeading>
          Create new parking
        </styled.CreateParkingHeading>

        <styled.CreateParkingSectionDescription>
          Parking size
        </styled.CreateParkingSectionDescription>

        <styled.CreateParkingSizeContainer>
          <InputNumber
            value={parkingLength}
            onChange={onParkingLengthChange}
            placeholder="Enter parking length (mm)"
            min={0}
          />
          <InputNumber
            value={parkingWidth}
            onChange={onParkingWidthChange}
            placeholder="Enter parking width (mm)"
            min={0}
          />
          <InputNumber
            value={parkingHeight}
            onChange={onParkingHeightChange}
            placeholder="Enter parking height (mm)"
            min={0}
          />
        </styled.CreateParkingSizeContainer>

        <styled.CreateParkingSectionDescription>
          Parking location
        </styled.CreateParkingSectionDescription>

        <styled.CreateParkingGeometry
          value={parkingsGeoJsonSource}
          onChange={onParkingsChange}
          placeholder={isLatLon ? textareaLatLonPlaceholder : textareaLonLatPlaceholder}
        />

        <styled.CreateParkingControlsContainer>
          <ToggleSwitch
            value1="lon, lat"
            value2="lat, lon"
            onChange={toggleIsLatLon}
            colorScheme={ToggleSwitchColorScheme3}
          />
          <Button onClick={onParkingsAdd} withRoundedCorners>ADD</Button>
        </styled.CreateParkingControlsContainer>

      </styled.CreateParkingForm>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector<RootReducer, CreateParkingPageOwnProps>({
  zoomLevel: ParkingsPageSelectors.zoomLevelSelector,
  centerLat: ParkingsPageSelectors.centerCoordinatesLatitudeSelector,
  centerLon: ParkingsPageSelectors.centerCoordinatesLongitudeSelector,
});

const mapDispatchToProps: CreateParkingPageDispatchProps = {
  createParking: ParkingsPageActions.createParking,
  setZoomLevel: ParkingsPageActions.setZoomLevel,
  setSearchRadius: BaseConfigActions.setSearchRadius,
  setParkingsPageCenter: ParkingsPageActions.setParkingsPageCenter,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  withMap,
)(CreateParkingPageMapContent);
