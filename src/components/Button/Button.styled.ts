import styled from 'styled-components';
import { COLORS } from '../../constants/colors';


type typeToColor = {
  regular: string,
  warning: string,
  error: string,
};
const typeToColor = {
  regular: COLORS.colorAccent1,
  warning: COLORS.colorAccent2,
  error: COLORS.colorAccent3,
};
type ButtonColorType = keyof typeToColor;

export const Button = styled.button<{
  withRoundedCorners?: boolean,
  colorType?: ButtonColorType,
}>`
  background-color: ${(props) => props.colorType ? typeToColor[props.colorType] : COLORS.colorAccent1};
  border: none;
  color: ${COLORS.colorMainText};
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: ${({ withRoundedCorners }) => withRoundedCorners ? 3 : 0}px;
  font-weight: 500;
`;
