import styled from 'styled-components';

import { COLORS } from '../../../constants/colors';


export const UserAvatarInputContainer = styled.div`
  flex-grow: 1;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${COLORS.colorBorder};
`;

export const UserCurrentAvatarLabel = styled.label`
  cursor: pointer;
  position: relative;
  font-size: 1.25em;
  font-weight: 700;
`;

export const UserCurrentAvatar = styled.img`
  width: 100px;
`;

export const UserCurrentAvatarError = styled.p`
  font-size: 12px;
  color: ${COLORS.colorAccent2};
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

export const InputContainer = styled.div`
  position: relative;
  width: 200px;
  margin: 20px 0;
`;

export const ChangeAvatarInputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;


