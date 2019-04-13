import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RootReducer } from '../../store/rootReducer';
import * as styled from './AdminPage.styled';


interface AdminPageOwnProps {}

interface AdminPageProps extends AdminPageOwnProps {}

class DriverPage extends React.PureComponent<AdminPageProps> {
  static propTypes = {};

  render() {
    return (
      <styled.Wrapper>
        Admin page
      </styled.Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, AdminPageOwnProps>({});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(DriverPage);
