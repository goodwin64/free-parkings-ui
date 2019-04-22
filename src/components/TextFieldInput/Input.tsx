import React from 'react';

import * as styled from './Input.styled';


interface InputProps {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
}

export default function Input(props: InputProps) {
  return (
    <styled.InputContainer>
      <styled.Input
        type="text"
        value={props.value.slice(0, 100)}
        onChange={props.onChange}
        className="effect-20"
        required
      />
      <styled.InputPlaceholder>
        {props.placeholder}
      </styled.InputPlaceholder>
      <span className="focus-border"><i/></span>
    </styled.InputContainer>
  )
}
