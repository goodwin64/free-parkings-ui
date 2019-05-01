import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as settingsStyled from '../UserSettingsPage.styled';
import { RootReducer } from '../../../store/rootReducer';
import {
  carInfoSelector, carManufacturersSelector,
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
import Dropdown from '../../../components/Dropdown/Dropdown';
import InputText from '../../../components/TextFieldInput/InputText';
import { SettingButton } from '../UserSettingsPage.styled';
import InputNumber from '../../../components/TextFieldInput/InputNumber';


interface CarPageDispatchProps {
  loadCarParameters: loadCarParametersAttemptActionCreator,
  updateCarParameterValue: updateCarParameterValueAttemptActionCreator,
}

interface UserSettingsCarInfoProps extends CarPageOwnProps, CarPageDispatchProps {
}

interface UserSettingsCarInfoState {
  readonly manufacturer: string,
  readonly model: string,
  readonly number: string,
  readonly year: number | '',
  readonly color: string,
  readonly length: number | '',
  readonly width: number | '',
  readonly height: number | '',
}

class UserSettingsCarInfo extends React.PureComponent<UserSettingsCarInfoProps, UserSettingsCarInfoState> {
  state: UserSettingsCarInfoState = {
    manufacturer: this.props.carInfo.manufacturer || '',
    model: this.props.carInfo.model || '',
    number: this.props.carInfo.number || '',
    year: this.props.carInfo.year || '',
    color: this.props.carInfo.color || '',
    length: this.props.carInfo.length || '',
    width: this.props.carInfo.width || '',
    height: this.props.carInfo.height || '',
  };

  componentDidMount() {
    this.props.loadCarParameters();
  }

  componentWillReceiveProps(nextProps: Readonly<UserSettingsCarInfoProps>, nextContext: any): void {
    const propsThatDifferFromState = Object
      .keys(nextProps.carInfo)
      .filter(key => nextProps.carInfo[key] !== this.state[key]);

    if (propsThatDifferFromState.length > 0) {
      const nextState = propsThatDifferFromState.reduce(
        (acc, changedPropName) => ({
          ...acc,
          [changedPropName]: nextProps.carInfo[changedPropName],
        }),
        {},
      );
      this.setState(nextState);
    }
  }

  onManufacturerChange = (manufacturer: string) => {
    this.setState({ manufacturer }, this.updateManufacturer);
  };

  onModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const model: string = e.target.value;
    this.setState({ model });
  };

  onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number: string = e.target.value;
    this.setState({ number });
  };

  onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year: number = e.target.valueAsNumber;
    this.setState({ year });
  };

  onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color: string = e.target.value;
    this.setState({ color });
  };

  onLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const length: number = e.target.valueAsNumber;
    this.setState({ length });
  };

  onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const width: number = e.target.valueAsNumber;
    this.setState({ width });
  };

  onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height: number = e.target.valueAsNumber;
    this.setState({ height });
  };

  updateManufacturer = () => this.props.updateCarParameterValue('manufacturer', this.state.manufacturer);
  updateModel = () => this.props.updateCarParameterValue('model', this.state.model);
  updateNumber = () => this.props.updateCarParameterValue('number', this.state.number);
  updateYear = () => this.props.updateCarParameterValue('year', this.state.year);
  updateColor = () => this.props.updateCarParameterValue('color', this.state.color);
  updateLength = () => this.props.updateCarParameterValue('length', this.state.length);
  updateWidth = () => this.props.updateCarParameterValue('width', this.state.width);
  updateHeight = () => this.props.updateCarParameterValue('height', this.state.height);

  handleKeyPress = (paramKey: string, paramValue?: string | number) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        this.props.updateCarParameterValue(paramKey, paramValue);
      }
    };

  handleKeyPressModel = this.handleKeyPress('model', this.state.model);
  handleKeyPressNumber = this.handleKeyPress('number', this.state.number);
  handleKeyPressYear = this.handleKeyPress('year', this.state.year);
  handleKeyPressColor = this.handleKeyPress('color', this.state.color);
  handleKeyPressLength = this.handleKeyPress('length', this.state.length);
  handleKeyPressWidth = this.handleKeyPress('width', this.state.width);
  handleKeyPressHeight = this.handleKeyPress('height', this.state.height);

  render() {
    return (
      <settingsStyled.AllSettingsContainer>
        <settingsStyled.AllSettingsHeader>Tell us about your car</settingsStyled.AllSettingsHeader>

        <settingsStyled.SettingContainer>
          <settingsStyled.SettingDescription withGrow>
            Manufacturer
          </settingsStyled.SettingDescription>
          <Dropdown
            options={this.props.carManufacturers}
            value={this.props.carInfo.manufacturer}
            onChange={this.onManufacturerChange}
          />
        </settingsStyled.SettingContainer>

        <settingsStyled.SettingContainer>
          <InputText
            value={this.state.model}
            onChange={this.onModelChange}
            placeholder="Enter car model"
            onKeyPress={this.handleKeyPressModel}
          />
          <SettingButton
            onClick={this.updateModel}
            disabled={this.state.model === this.props.carInfo.model}
          >
            Save
          </SettingButton>
        </settingsStyled.SettingContainer>

        <settingsStyled.SettingContainer>
          <InputText
            value={this.state.number}
            onChange={this.onNumberChange}
            placeholder="Enter car number"
            onKeyPress={this.handleKeyPressNumber}
          />
          <SettingButton
            onClick={this.updateNumber}
            disabled={this.state.number === this.props.carInfo.number}
          >
            Save
          </SettingButton>
        </settingsStyled.SettingContainer>

        <settingsStyled.SettingContainer>
          <InputNumber
            value={this.state.year}
            onChange={this.onYearChange}
            placeholder="Enter car year"
            onKeyPress={this.handleKeyPressYear}
          />
          <SettingButton
            onClick={this.updateYear}
            disabled={this.state.year === this.props.carInfo.year}
          >
            Save
          </SettingButton>
        </settingsStyled.SettingContainer>

        <settingsStyled.SettingContainer>
          <settingsStyled.SettingDescription>
            Enter car color
          </settingsStyled.SettingDescription>
          <input
            type="color"
            value={this.state.color}
            onChange={this.onColorChange}
            placeholder="Enter car color"
            style={{ flexGrow: 1, height: 40 }}
            onKeyPress={this.handleKeyPressColor}
          />
          <SettingButton
            onClick={this.updateColor}
            disabled={this.state.color === this.props.carInfo.color}
          >
            Save
          </SettingButton>
        </settingsStyled.SettingContainer>

        <settingsStyled.SettingContainer>
          <InputNumber
            value={this.state.length}
            onChange={this.onLengthChange}
            placeholder="Enter car length (mm)"
            onKeyPress={this.handleKeyPressLength}
          />
          <SettingButton
            onClick={this.updateLength}
            disabled={this.state.length === this.props.carInfo.length}
          >
            Save
          </SettingButton>
        </settingsStyled.SettingContainer>

        <settingsStyled.SettingContainer>
          <InputNumber
            value={this.state.width}
            onChange={this.onWidthChange}
            placeholder="Enter car width (mm)"
            onKeyPress={this.handleKeyPressWidth}
          />
          <SettingButton
            onClick={this.updateWidth}
            disabled={this.state.width === this.props.carInfo.width}
          >
            Save
          </SettingButton>
        </settingsStyled.SettingContainer>

        <settingsStyled.SettingContainer>
          <InputNumber
            value={this.state.height}
            onChange={this.onHeightChange}
            placeholder="Enter car height (mm)"
            onKeyPress={this.handleKeyPressHeight}
          />
          <SettingButton
            onClick={this.updateHeight}
            disabled={this.state.height === this.props.carInfo.height}
          >
            Save
          </SettingButton>
        </settingsStyled.SettingContainer>

        <pre>{JSON.stringify(this.props, null, 4)}</pre>
      </settingsStyled.AllSettingsContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, CarPageOwnProps>({
  isInProgress: carPageIsInProgressSelector,
  isError: carPageIsErrorSelector,
  isCached: carPageIsCachedSelector,
  carManufacturers: carManufacturersSelector,
  carInfo: carInfoSelector,
});

const mapDispatchToProps = {
  loadCarParameters: loadCarParametersAttempt,
  updateCarParameterValue: updateCarParameterValueAttempt,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsCarInfo);
