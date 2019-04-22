import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { COLORS } from '../../constants/colors';
import { PageWrapper as CommonPageWrapper } from '../../components/CommonStyled/PageWrapper.styled';
import { TextFieldInput as CommonTextFieldInput } from '../../components/TextFieldInput/TextFieldInput.styled';
import { default as CommonShowPasswordEyeIcon } from '../../assets/icons/ShowPasswordEyeIcon';
import { Tile } from '../../components/CommonStyled/Tile.styled';


export const PageWrapper = styled(CommonPageWrapper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const LoginFormWrapper = styled(Tile)`
  overflow: hidden;
`;

export const LoginFormContainer = styled.div`
  padding: 30px 75px 15px;
  background-color: ${COLORS.colorAntiMain};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const LoginFormHeader = styled.h2`
  background-color: ${COLORS.colorAccent4};
  color: ${COLORS.colorAntiMain};
  font-weight: bold;
  margin: 0;
  padding: 22px;
  text-align: center;
`;

export const TextFieldLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  position:relative;
  
  p {
    margin-bottom: 10px;
  }
`;

export const LoginFormInput = styled(CommonTextFieldInput)`
  font-size: 16px;
  height: 40px;
  padding: 12px 40px 12px 20px;
  transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 100%;
`;

export const ErrorBlock = styled.div<{
  visible: boolean,
}>`
  color: ${COLORS.colorAccent2};
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'};
`;

export const ShowPasswordEyeButton = styled.button`
  bottom: 8px;
  position: absolute;
  right: 10px;
`;

export const ShowPasswordEyeIcon = CommonShowPasswordEyeIcon;

export const SubmitButtonContainer = styled.div`
  padding: 0 30px;
  
  &:hover {
    filter: brightness(95%);
  }
`;

export const SubmitButton = styled.input`
  background-color: ${COLORS.colorAccent4};
  border-radius: 35px;
  box-shadow: none;
  color: ${COLORS.colorAntiMain};
  cursor: pointer;
  font-size: 16px;
  height: 45px;
  padding: 0 10px;
  transition: all 0.25s ease;
  width: 100%;
  
  &[disabled] {
    background-color: ${COLORS.colorInactive};
    cursor: not-allowed;
  }
`;

export const SignupLink = styled(Link)`
  align-self: flex-end;
`;