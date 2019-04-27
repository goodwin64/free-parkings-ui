import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as settingsStyled from '../UserSettingsPage.styled';
import { RootReducer } from '../../../store/rootReducer';
import {
  carInfoSelector,
  carPageIsCachedSelector,
  carPageIsErrorSelector,
  carPageIsInProgressSelector,
} from '../../../store/car/selectors';
import { CarPageOwnProps } from '../../../store/car/reducer';
import {
  loadCarParametersAttempt, loadCarParametersAttemptActionCreator,
  updateCarParameterValueAttempt,
  updateCarParameterValueAttemptActionCreator,
} from '../../../store/car/actions';


interface CarPageDispatchProps {
  loadCarParameters: loadCarParametersAttemptActionCreator,
  updateCarParameterValue: updateCarParameterValueAttemptActionCreator,
}

interface UserSettingsCarInfoProps extends CarPageOwnProps, CarPageDispatchProps {}

class UserSettingsCarInfo extends React.PureComponent<UserSettingsCarInfoProps> {
  componentDidMount() {
    this.props.loadCarParameters();
  }

  render() {
    return (
      <settingsStyled.AllSettingsContainer>
        <pre>{JSON.stringify(this.props, null, 4)}</pre>
      </settingsStyled.AllSettingsContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, CarPageOwnProps>({
  isInProgress: carPageIsInProgressSelector,
  isError: carPageIsErrorSelector,
  isCached: carPageIsCachedSelector,
  carInfo: carInfoSelector,
});

const mapDispatchToProps = {
  loadCarParameters: loadCarParametersAttempt,
  updateCarParameterValue: updateCarParameterValueAttempt,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsCarInfo);
