import React from 'react';

import * as styled from './Input.styled';
import './Input.global.css';


interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
}

export default function InputText(props: InputProps) {
  const { placeholder, ...restProps } = props;

  return (
    <styled.InputContainer>
      <input
        type="text"
        value={(props.value || '').slice(0, 100)}
        onChange={props.onChange}
        className="effect-20"
        required
        style={{ textOverflow: 'ellipsis' }}
        {...restProps}
      />
      <styled.InputPlaceholder>
        {props.placeholder}
      </styled.InputPlaceholder>
      <span className="focus-border"><i/></span>
    </styled.InputContainer>
  );
}
