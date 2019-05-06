import React from 'react';
import PropTypes from 'prop-types';

import './ToggleSwitch.global.css';

type ColorScheme1 = 'red-green';
type ColorScheme2 = 'black-white';
type ColorScheme3 = 'orange-blue';

export const ToggleSwitchColorScheme1: ColorScheme1 = 'red-green';
export const ToggleSwitchColorScheme2: ColorScheme2 = 'black-white';
export const ToggleSwitchColorScheme3: ColorScheme3 = 'orange-blue';

interface ToggleSwitchProps {
  value1?: string,
  value2?: string,
  onChange: (value: boolean) => void,
  colorScheme?: ColorScheme1 | ColorScheme2 | ColorScheme3,
  isOnByDefault?: boolean,
  disabled?: boolean,
}

ToggleSwitch.propTypes = {
  value1: PropTypes.string,
  value2: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  colorScheme: PropTypes.oneOf([ToggleSwitchColorScheme1, ToggleSwitchColorScheme2, ToggleSwitchColorScheme3]),
  isOnByDefault: PropTypes.bool,
  disabled: PropTypes.bool,
};

ToggleSwitch.defaultProps = {
  value1: '',
  value2: '',
  colorScheme: ToggleSwitchColorScheme1,
  isOnByDefault: false,
  disabled: false,
};

export default function ToggleSwitch(props: ToggleSwitchProps) {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };

  return (
    <label className={`switch ${props.disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        id="togBtn"
        onChange={onInputChange}
        defaultChecked={props.isOnByDefault}
      />
      <div className={`slider round ${props.colorScheme ? props.colorScheme : ToggleSwitchColorScheme1}`}>
        <span className="off">{props.value1}</span>
        <span className="on">{props.value2}</span>
      </div>
    </label>
  )
}