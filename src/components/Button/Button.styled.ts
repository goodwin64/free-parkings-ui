import styled from 'styled-components';
import { COLORS } from '../../constants/colors';


export const Button = styled.button<{
  withRoundedCorners?: boolean,
}>`
  background-color: ${COLORS.colorAccent1};
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
