import * as React from 'react';

import './ToggleSwitch.global.css';


interface ToggleSwitchProps {
  value1?: string,
  value2?: string,
  onChange: (value: boolean) => void,
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };

  return (
    <label className="switch">
      <input type="checkbox" id="togBtn" onChange={onInputChange}/>
      <div className="slider round">
        <span className="off">{props.value1}</span>
        <span className="on">{props.value2}</span>
      </div>
    </label>
  )
}