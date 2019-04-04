import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

export const TextFieldInput = styled.input<{
  error: boolean,
}>`
  background-color: ${COLORS.colorAntiMain};
  border: 1px solid ${props => props.error ? COLORS.colorBorderError : props.theme.borderColor};
  border-radius: 3px;
  padding: 12px 40px 12px 20px;
`;
