import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { RootReducer } from '../../store/rootReducer';
import * as styled from './AdminAccountPage.styled';


interface AdminAccountPageOwnProps {}

interface AdminAccountPageProps extends AdminAccountPageOwnProps {}

class AdminAccountPage extends React.PureComponent<AdminAccountPageProps> {
  static propTypes = {};

  render() {
    return (
      <styled.Wrapper>
        Admin page
      </styled.Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, AdminAccountPageOwnProps>({});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(AdminAccountPage);
