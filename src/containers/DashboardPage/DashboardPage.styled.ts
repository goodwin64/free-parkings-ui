import styled from 'styled-components';
import { COLORS } from '../../constants/colors';


export const LinksContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavLinkWrapper = styled.div`
  width: 25%;
  height: 360px;
  
  & > a {
    align-items: center;
    color: ${COLORS.colorAccent4};
    display: flex;
    height: 100%;
    justify-content: center;
    padding-bottom: 20px;
    position: relative;
    width: 100%;
  }
  
  & img {
    width: 80%;
  }
  
  & h2 {
    bottom: 10px;
    left: 50%;
    font-size: 36px;
    position: absolute;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(150, 150, 150, 1);
    transform: translateX(-50%);
    width: 100%;
    
    @media (max-width: 700px) {
      font-size: 20px;
    }
  }
`;
