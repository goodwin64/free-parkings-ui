import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { resetBaseConfigRadius, setBaseConfigRadius } from './BaseConfigActions';
import { RootReducer } from '../../store/rootReducer';

import * as style from './style.module.css';


interface BaseConfigPageProps {
  radius: number,
  setBaseConfigRadius: (radius: number) => void,
}

class BaseConfigPage extends React.Component<BaseConfigPageProps> {
  handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setBaseConfigRadius(evt.target.valueAsNumber || 0);
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
    setBaseConfigRadius,
    resetBaseConfigRadius,
  },
);

export default compose(
  withRouter,
  withConnect,
)(BaseConfigPage);
