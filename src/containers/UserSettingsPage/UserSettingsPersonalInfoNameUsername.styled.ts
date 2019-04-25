import styled from 'styled-components';

import { SettingsSection } from './UserSettingsPage.styled';
import { Button } from '../../components/Button/Button.styled';
import { COLORS } from '../../constants/colors';


export const Container = styled(SettingsSection)`
  grid: auto / 1fr 1fr;
`;

export const SettingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${COLORS.colorBorder};
  padding: 20px;
`;

export const SettingButton = styled(Button)`
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
`;
