import styled from 'styled-components';

import { PageWrapper } from '../../components/CommonStyled/commonStyled';


export const Container = styled(PageWrapper)`
  & table {
    border-collapse: collapse;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  
  & table td, & table th {
    padding-left: 8px;
    text-align: center;
    height: 50px;
    
    & > img {
      max-height: 100%;
    }
  }
  
  & table tr th:first-child,
  & table tr td:first-child {
    padding-left: 40px;
  }
  
  & table tr th:last-child,
  & table tr td:last-child {
    padding-right: 40px;
  }
  
  & table thead tr {
    height: 60px;
    background: #36304a;
  }
  
  & table thead tr th {
    font-size: 18px;
    color: #fff;
    line-height: 1.2;
    font-weight: unset;
  }
  
  & table tbody tr {
    height: 50px;
    font-size: 15px;
    color: #808080;
    line-height: 1.2;
    font-weight: unset;
  }
  
  & table tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }
`;
