import styled from 'styled-components';
import { COLORS } from '../../constants/colors';


export const TabHeader = styled.h2<{
  active: boolean
}>`
  border-bottom: 3px solid ${({ active }) => active ? COLORS.colorAccent4 : 'transparent'};
  display: inline-block;
  margin-right: 50px;
  cursor: pointer;
  padding: 15px 0;
`;

export const SettingsSection = styled.section`
  margin-bottom: 100px;
  display: grid;
  grid-gap: 20px;

  &:last-child {
    margin-bottom: 40px;
  }
`;

export const SettingsHeader = styled.h3`
  grid-column: 1 / -1;
`;

export const SettingsDescription = styled.p`
  grid-column: 1 / -1;
`;
