import React from 'react';

import * as styled from './Input.styled';
import './Input.global.css';


interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value: number | '',
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
}

export default function InputNumber(props: InputProps) {
  const { placeholder, ...restProps } = props;

  return (
    <styled.InputContainer>
      <input
        type="number"
        value={props.value}
        onChange={props.onChange}
        className="effect-20"
        required
        {...restProps}
      />
      <styled.InputPlaceholder>
        {props.placeholder}
      </styled.InputPlaceholder>
      <span className="focus-border"><i/></span>
    </styled.InputContainer>
  )
}
