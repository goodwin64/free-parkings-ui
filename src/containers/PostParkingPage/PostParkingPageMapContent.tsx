import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';

import Button from '../../components/Button/Button';
import { RootReducer } from '../../store/rootReducer';
import { RouterProps } from '../../interfaces/RouterProps';
import * as styled from './PostParkingPageMapContent.styled';
import * as ParkingsPageActions from '../../store/parkings/actions';
import InputNumber from '../../components/TextFieldInput/InputNumber';
import { Parking } from '../../interfaces/Parking';
import * as ParkingsPageSelectors from '../../store/parkings/selectors';
import ToggleSwitch, {
  ToggleSwitchColorScheme1,
  ToggleSwitchColorScheme3,
} from '../../components/ToggleSwitch/ToggleSwitch';
import UrlService from '../../services/Url.service';


interface PostParkingPageOwnProps {
  selectedParking: Parking | null;
}

export interface PostParkingPageDispatchProps {
  postParking: ParkingsPageActions.postParkingAttemptActionCreator,
  deleteParking: ParkingsPageActions.deleteParkingActionCreator,
}

interface PostParkingPageProps extends PostParkingPageOwnProps,
  PostParkingPageDispatchProps,
  RouterProps {
}

const textareaLatLonPlaceholder = `lat1, lon1
lat2, lon2
...
latN, lonN`;

const textareaLonLatPlaceholder = `lon1, lat1
lon2, lat2
...
lonN, latN`;

function PostParkingPageMapContent(props: PostParkingPageProps) {
  const navigateBackToFindParkings = () => {
    props.history.push({
      pathname: UrlService.findParkingsPageUrl,
      search: props.location.search,
    });
  };

  const [isLatLon, setIsLatLon] = React.useState(Boolean(props.selectedParking));

  const [parkingsGeoJsonSource, setParkingsGeoJsonSource] = props.selectedParking
    ? React.useState(props.selectedParking.geometry.map(point => point.join(', ')).join('\n'))
    : React.useState('');

  const [parkingLength, setParkingLength] = props.selectedParking
    ? React.useState(props.selectedParking.length)
    : React.useState(0);

  const [parkingWidth, setParkingWidth] = props.selectedParking
    ? React.useState(props.selectedParking.width)
    : React.useState(0);

  const [parkingHeight, setParkingHeight] = props.selectedParking
    ? React.useState(props.selectedParking.height)
    : React.useState(0);

  const [costPerHour, setCostPerHour] = props.selectedParking
    ? React.useState(props.selectedParking.costPerHour)
    : React.useState(0);

  const [maxStayDuration, setMaxStayDuration] = props.selectedParking
    ? React.useState(props.selectedParking.maxStayDuration)
    : React.useState(0);

  const [isFree, setIsFree] = props.selectedParking
    ? React.useState(props.selectedParking.isFree)
    : React.useState(true);

  const areAllParametersValid = Boolean(
    parkingsGeoJsonSource
    && parkingLength
    && parkingWidth
    && parkingHeight
    && costPerHour
    && maxStayDuration,
  );

  const handleUserKeyPress = React.useCallback(event => {
    if (event.keyCode === 27) {
      navigateBackToFindParkings();
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('keyup', handleUserKeyPress);

    return () => {
      window.removeEventListener('keyup', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const onParkingGeometryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParkingsGeoJsonSource(e.target.value);
  };

  const onParkingSubmit = () => {
    if (areAllParametersValid) {
      props.postParking({
        ...props.selectedParking ? { id: props.selectedParking.id } : {},
        parkingsGeoJsonSource,
        isLatLon,
        parkingLength,
        parkingWidth,
        parkingHeight,
        costPerHour,
        maxStayDuration,
        features: [],
        restrictions: [],
        isFree,
      }, isFree);
    }
    navigateBackToFindParkings();
  };

  const onParkingDelete = () => {
    if (props.selectedParking) {
      props.deleteParking(props.selectedParking.id);
    }
    navigateBackToFindParkings();
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onParkingLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => setParkingLength(e.target.valueAsNumber);
  const onParkingWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => setParkingWidth(e.target.valueAsNumber);
  const onParkingHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => setParkingHeight(e.target.valueAsNumber);
  const onCostPerHourChange = (e: React.ChangeEvent<HTMLInputElement>) => setCostPerHour(e.target.valueAsNumber);
  const onMaxStayDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => setMaxStayDuration(e.target.valueAsNumber);
  const toggleIsLatLon = () => setIsLatLon(!isLatLon);
  const toggleIsFree = () => setIsFree(!isFree);

  return (
    <styled.CreateParkingForm onSubmit={onFormSubmit}>
      <styled.CreateParkingHeading>
        {props.selectedParking ? 'Edit parking' : 'Create new parking'}
      </styled.CreateParkingHeading>

      <styled.CreateParkingSectionDescription>
        Parking size
      </styled.CreateParkingSectionDescription>

      <styled.CreateParkingParameterContainer>
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
      </styled.CreateParkingParameterContainer>

      <styled.CreateParkingSectionDescription>
        Cost and stay duration
      </styled.CreateParkingSectionDescription>

      <styled.CreateParkingParameterContainer>
        <InputNumber
          value={costPerHour}
          onChange={onCostPerHourChange}
          placeholder="Enter cost per hour ($)"
          min={0}
          step={0.01}
        />
        <InputNumber
          value={maxStayDuration}
          onChange={onMaxStayDurationChange}
          placeholder="Enter maximum stay duration (min)"
          min={0}
          step={5}
        />
      </styled.CreateParkingParameterContainer>

      <styled.CreateParkingSectionDescription>
        Parking location
      </styled.CreateParkingSectionDescription>

      <styled.CreateParkingGeometry
        value={parkingsGeoJsonSource}
        onChange={onParkingGeometryChange}
        placeholder={isLatLon ? textareaLatLonPlaceholder : textareaLonLatPlaceholder}
      />

      <styled.CreateParkingControlsContainer>
        <div>
          <ToggleSwitch
            value1="lon, lat"
            value2="lat, lon"
            onChange={toggleIsLatLon}
            colorScheme={ToggleSwitchColorScheme3}
            isOnByDefault={isLatLon}
          />
          {' '}
          <ToggleSwitch
            value1="busy"
            value2="free"
            onChange={toggleIsFree}
            colorScheme={ToggleSwitchColorScheme1}
            isOnByDefault={isFree}
          />
        </div>
        <div>
          {
            props.selectedParking && (
              <Button onClick={onParkingDelete} withRoundedCorners colorType="warning">
                DELETE
              </Button>
            )
          }
          {' '}
          <Button onClick={onParkingSubmit} withRoundedCorners disabled={!areAllParametersValid}>
            {props.selectedParking ? 'SAVE' : 'ADD'}
          </Button>
        </div>
      </styled.CreateParkingControlsContainer>

    </styled.CreateParkingForm>
  );
}

const mapStateToProps = createStructuredSelector<RootReducer, PostParkingPageOwnProps>({
  selectedParking: ParkingsPageSelectors.selectedParkingSelector,
});

const mapDispatchToProps: PostParkingPageDispatchProps = {
  postParking: ParkingsPageActions.postParkingAttempt,
  deleteParking: ParkingsPageActions.deleteParking,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  withRouter,
)(PostParkingPageMapContent);
