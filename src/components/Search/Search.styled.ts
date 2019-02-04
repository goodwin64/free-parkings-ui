import styled from 'styled-components';
import { COLORS } from '../../constants/colors';


export const Input = styled('input')<{}>`
  background-color: ${COLORS.colorMainText};
  border-radius: 3px;
  color: ${COLORS.colorAntiMain};
  font-size: 15px;
  font-weight: 500;
  height: 100%;
  opacity: 0.8;
  outline: none;
  padding: 0 20px 0 10px;
  width: 100%;

  ::placeholder {
    color: #bbb;
  }
`;

export const SearchContainer = styled.div`
  height: 48px;
  left: 50%;
  max-width: 480px;
  position: absolute;
  top: 20px;
  transform: translateX(-50%);
  width: 100%;
  z-index: var(--zIndexSearchContainer);
  
  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

export const List = styled.ul`
  background-color: ${COLORS.colorMainText};
  color: ${COLORS.colorAntiMain};
  opacity: 0.8;
  list-style-type: none;
  padding: 6px 20px;
`;

export const Item = styled.li`
  cursor: pointer;
  font-size: 13px;
  padding: 4px 0px;
`;
