import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { RootReducer } from '../../store/rootReducer';
import { RouterProps } from '../../interfaces/RouterProps';
import withMap, { MapContextProps } from '../../components/Map/context';
import { resetSearchRadius, setSearchRadius } from './BaseConfigActions';

import * as style from './style.module.css';


interface BaseConfigPageOwnProps {
  radius: number,
  setSearchRadius: (radius: number) => void,
}

interface BaseConfigPageProps extends BaseConfigPageOwnProps, RouterProps, MapContextProps {}

class BaseConfigPage extends React.Component<BaseConfigPageProps> {
  handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchRadius(evt.target.valueAsNumber || 0);
  };

  render() {
    return (
      <section className={style['configContainer']}>
        <label htmlFor="configSearchRadius">
          Search radius, meters
          <input
            id="configSearchRadius"
            type="number"
            min={0}
            step={100}
            max={7500}
            onChange={this.handleChange}
            defaultValue={'' + this.props.radius}
          />
        </label>
        <Link
          to="/"
        >
          <button>save</button>
        </Link>
      </section>
    );
  }
}

const mapStateToProps = function(state: RootReducer) {
  return {
    radius: state.config.parkingSearchRadius,
  };
};

const withConnect = connect(
  mapStateToProps,
  {
    setSearchRadius,
    resetSearchRadius,
  },
);

export default compose(
  withConnect,
  withRouter,
  withMap,
)(BaseConfigPage);

// export default withConnect(withRouter<BaseConfigPageProps>(BaseConfigPage));
