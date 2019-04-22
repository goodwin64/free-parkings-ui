import styled from 'styled-components';

import { SettingsSection } from './UserSettingsPage.styled';
import { Button } from '../../components/Button/Button.styled';


export const Container = styled(SettingsSection)`
  grid: auto auto 1fr / 1fr 1fr;
`;

export const SettingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SettingButton = styled(Button)`
  height: 40px;
  line-height: 40px;
  padding-top: 0;
  padding-bottom: 0;
`;
