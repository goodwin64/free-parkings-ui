import styled from 'styled-components';


export const Input = styled('input')<{}>`
  color: #666;
  font-size: 13px;
  height: 100%;
  outline: none;
  padding: 0 20px 0 10px;
  width: 100%;

  ::placeholder {
    color: #bbb;
  }
`;

export const Container = styled.div`
  background-color: white;
  height: 48px;
  left: 50%;
  max-width: 480px;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  z-index: 4;
`;

export const List = styled.ul`
  background-color: white;
  list-style-type: none;
  padding: 6px 20px;
`;

export const Item = styled.li`
  color: #666;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 0px;
`;

export const SearchButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
`;
