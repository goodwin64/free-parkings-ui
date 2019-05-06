import styled from 'styled-components';


export const CreateParkingForm = styled.form`
  background-color: #0004;
  border-radius: 50px;
  color: #ffffff;
  display: grid;
  grid-gap: 10px;
  grid: 2fr 1fr 2fr 1fr 2fr 1fr 5fr 2fr / 1fr 1fr;
  left: 10%;
  padding: 50px;
  position: absolute;
  top: 10%;
  transition: all 0.25s ease-in;
  right: 10%;
  bottom: 10%;
  
  &:focus-within,
  &:hover {
    background-color: #0008;
  }

  & * {
    color: #ffffff !important;
    font-weight: bold;
  }
`;

export const CreateParkingHeading = styled.h2`
  grid-column: 1 / -1;
  font-size: 2.5rem;
  text-align: center;
`;

export const CreateParkingSectionDescription = styled.p`
  grid-column: 1 / -1;
  font-size: 1.5rem;
`;

export const CreateParkingParameterContainer = styled.section`
  display: flex;
  grid-column: 1 / -1;
  justify-content: space-between;
  
  &&& > * {
    margin-right: 10px;
  
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const CreateParkingControlsContainer = styled.section`
  display: flex;
  grid-column: 1 / -1;
  justify-content: space-between;
  
  & > button {
    color: #000 !important;
  }
`;

export const CreateParkingGeometry = styled.textarea`
  background-color: transparent;
  grid-column: 1 / -1;
  height: 200px;
  
  &::placeholder {
    color: #ffffff88;
  }
`;
