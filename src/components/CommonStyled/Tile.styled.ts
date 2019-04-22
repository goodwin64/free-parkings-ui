import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

export const Tile = styled.section<{
  withShadow?: boolean,
  withRoundedCorners?: boolean,
}>`
  background-color: ${COLORS.colorAntiMain};
  border-radius: ${({ withRoundedCorners }) => withRoundedCorners ? 15 : 0}px;
  box-shadow: ${({ withShadow }) => withShadow ? '0 0 10px 0 rgba(90, 103, 121, 0.1)' : 'none'};
`;

export const TileHeader = styled.header`
  padding: 0 40px;
  border-bottom: 1px solid ${COLORS.colorBorder};
`;

export const TileBody = styled.main`
  padding: 20px 40px;
`;

// @ts-ignore
Tile.defaultProps = {
  withShadow: true,
  withRoundedCorners: true,
};
