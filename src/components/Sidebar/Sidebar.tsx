import React from 'react';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';

import * as BaseConfigActions from '../../containers/BaseConfigPage/BaseConfigActions';

import * as styles from './Sidebar.module.css';


interface SidebarProps {
  isOpen: boolean,
  openSidebar: BaseConfigActions.openSidebarActionCreator,
  closeSidebar: BaseConfigActions.closeSidebarActionCreator,
}

class Sidebar extends React.PureComponent<SidebarProps> {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    closeSidebar: PropTypes.func.isRequired,
  };

  render() {
    const classname = classnames(styles['SidebarContainer'], {
      [styles['SidebarContainerOpened']]: this.props.isOpen,
      [styles['SidebarContainerClosed']]: !this.props.isOpen,
    });

    return (
      <aside className={classname}>
        <button
          className={this.props.isOpen ? styles['OpenSidebarButton'] : styles['CloseSidebarButton']}
          onClick={this.props.isOpen ? this.props.closeSidebar : this.props.openSidebar}
        >
          {'<'}
        </button>
        { this.props.children }
      </aside>
    );
  }
}

export default Sidebar;
