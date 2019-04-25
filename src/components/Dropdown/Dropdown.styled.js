import styled, { css } from 'styled-components';
import { COLORS } from '../../constants/colors';


export const Form = styled.form`
  position: relative;
  width: 200px;
  height: 64px;
`;

const Absolute = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export const InputChosenValue = styled.input`
  font-family: Lato;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 4px;
  height: 4rem;
  font-size: 1.1rem;
  padding: 15px 40px 15px 15px;
  background-color: ${COLORS.colorInactive};
  border: 3px solid transparent;
  transition: .3s ease-in-out;
  
  ${Absolute}

  &::-webkit-input-placeholder {
    color: #333;
  }
  
  &:hover {
    background-color: ${COLORS.colorAccent1}88;
    cursor: pointer;

    &::-webkit-input-placeholder {
      color: #333;
    }
  }
  
  &:focus,
  &.open {
     box-shadow: 0px 5px 8px 0px rgba(0,0,0,0.2);
     outline: 0;
     background-color: ${COLORS.colorAccent1};
     color: #000;
  
    &::-webkit-input-placeholder {
       color: #000;
     }
  }
`;

export const ValueList = styled.ul`
  list-style: none;
  margin-top: 4rem;
  box-shadow: 0px 5px 8px 0px rgba(0,0,0,0.2);
  overflow: hidden;
  max-height: 0;
  transition: .3s ease-in-out;
  z-index: 1;
  
  ${Absolute}
  
  &.open {
   max-height: 320px;
   overflow: auto;
  }
  
  li {
    position: relative;
    height: 4rem;
    background-color: #FAFCFD;
    padding: 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all .3s;
    opacity: 1;
    
    &:hover {
      background-color: ${COLORS.colorAccent1};
    }
    
    &.closed {
      max-height: 0;
      overflow: hidden;
      padding: 0;
      opacity: 0;
    }
  }
`;

export const ClearButton = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  cursor: pointer;
  font-size: 20px;
`;
