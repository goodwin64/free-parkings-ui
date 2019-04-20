import styled from 'styled-components';


export const Container = styled.div`
  display: grid;
  grid: auto auto / 100px 1fr;
  grid-gap: 20px 50px;
`;

export const MenuHeader = styled.h3`
  height: 30px;
  line-height: 30px;
  grid-column: 1 / -1;
`;

export const UserCurrentAvatarContainer = styled.label`
  align-self: center;
  justify-self: center;
  cursor: pointer;
  position: relative;
  font-size: 1.25em;
  font-weight: 700;
`;

export const UserCurrentAvatar = styled.img`
  max-width: 100%;
`;

export const UploadFileTooltip = styled.p`
  background-color: #444;
  bottom: 0;
  color: #ffffff;
  font-weight: bold;
  height: 30px;
  text-align: center;
  left: 0;
  line-height: 30px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  transition: opacity 0.1s ease-in;
  
  ${UserCurrentAvatar}:hover + & {
    opacity: 1;
  }
`;

export const AvatarParametersContainer = styled.div`
`;

export const InputContainer = styled.label`
  
`;

export const ChangeAvatarInputUrl = styled.input`
  
`;

export const ChangeAvatarInputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;


