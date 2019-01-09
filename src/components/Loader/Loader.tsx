import * as React from 'react';

import * as styles from './Loader.module.css';

class Loader extends React.PureComponent {
  render() {
    return (
      <div className={styles['loader']}>Loading...</div>
    );
  }
}

export default Loader;
