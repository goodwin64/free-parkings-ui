import styled from 'styled-components';

import { COLORS } from '../../constants/colors';
import { PageWrapper as CommonPageWrapper } from '../../components/PageWrapper/PageWrapper.styled';
import { TextFieldInput as CommonTextFieldInput } from '../../components/TextFieldInput/TextFieldInput.styled';
import { default as CommonShowPasswordEyeIcon } from '../../assets/icons/ShowPasswordEyeIcon';


export const PageWrapper = styled(CommonPageWrapper)`
  align-items: center;
  background-color: ${COLORS.pageBackground};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const LoginFormContainer = styled.div`
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(90, 103, 121, 0.1);
  overflow: hidden;
`;

export const LoginForm = styled.form`
  background-color: ${COLORS.colorAntiMain};
  padding: 28px 75px 40px;
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
  margin-bottom: 5px;
  padding: 12px 40px 12px 20px;
  transition: border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  width: 100%;
`;

export const ErrorBlock = styled.div<{
  visible: boolean,
}>`
  color: ${COLORS.colorAccent2};
  font-size: 12px;
  margin-top: -5px;
  min-height: 30px;
  visibility: ${(props) => props.visible ? 'visible' : 'hidden'};
`;

export const ShowPasswordEyeButton = styled.button`
  bottom: 14px;
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
    background-color: ${COLORS.colorRouteInactive};
    cursor: not-allowed;
  }
`;