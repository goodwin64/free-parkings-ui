import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../../components/Button/Button';
import * as styles from './styles.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { RootReducer } from '../../store/rootReducer';
import * as BaseConfigSelectors from '../BaseConfigPage/BaseConfigSelectors';
import * as BaseConfigActions from '../BaseConfigPage/BaseConfigActions';
import * as ParkingsPageActions from '../../store/parkings/actions';


interface ParkingsSidebarOwnProps {
  isSidebarOpen: boolean,
}

interface ParkingsSidebarDispatchProps {
  openSidebar: BaseConfigActions.openSidebarActionCreator,
  closeSidebar: BaseConfigActions.closeSidebarActionCreator,
  clearAllFreeSlots: ParkingsPageActions.clearAllFreeSlotsActionCreator,
  clearVisibleFreeSlots: ParkingsPageActions.clearVisibleFreeSlotsActionCreator,
}

interface ParkingsSidebarProps extends ParkingsSidebarOwnProps, ParkingsSidebarDispatchProps {}

function ParkingsSidebar(props: ParkingsSidebarProps) {
  return (
    <Sidebar
      isOpen={props.isSidebarOpen}
      openSidebar={props.openSidebar}
      closeSidebar={props.closeSidebar}
    >
      <Button
        onClick={props.clearAllFreeSlots}
        className={styles['ClearAllFreeSlotsButton']}
      >
        Clear All Free Slots
      </Button>

      <Button
        onClick={props.clearVisibleFreeSlots}
        className={styles['ClearVisibleFreeSlotsButton']}
      >
        Clear Visible Free Slots
      </Button>
    </Sidebar>
  );
}

const mapStateToProps = createStructuredSelector<RootReducer, ParkingsSidebarOwnProps>({
  isSidebarOpen: BaseConfigSelectors.isSidebarOpenSelector,
});

const mapDispatchToProps: ParkingsSidebarDispatchProps = {
  openSidebar: BaseConfigActions.openSidebar,
  closeSidebar: BaseConfigActions.closeSidebar,
  clearAllFreeSlots: ParkingsPageActions.clearAllFreeSlots,
  clearVisibleFreeSlots: ParkingsPageActions.clearVisibleFreeSlots,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(ParkingsSidebar);
