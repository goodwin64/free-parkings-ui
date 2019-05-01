import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import { Button } from '../../components/Button/Button.styled';


export const TabHeader = styled.h2<{
  active: boolean
}>`
  border-bottom: 3px solid ${({ active }) => active ? COLORS.colorAccent4 : 'transparent'};
  cursor: ${({ active }) => active ? 'default' : 'pointer'};
  display: inline-block;
  margin-right: 50px;
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

export const AllSettingsHeader = styled.h3`
  grid-column: 1 / -1;
`;

export const AllSettingsDescription = styled.p`
  grid-column: 1 / -1;
`;

export const AllSettingsContainer = styled(SettingsSection)`
  grid: auto / 1fr 1fr;
`;

export const SettingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${COLORS.colorBorder};
  padding: 20px;
`;

export const SettingDescription = styled.p<{
  withGrow?: boolean,
}>`
  margin-right: 20px;
  ${({ withGrow }) => withGrow && 'flex-grow: 1;'}
`;

export const SettingButton = styled(Button)`
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
`;
