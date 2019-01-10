import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { resetBaseConfigRadius, setBaseConfigRadius } from './BaseConfigActions';
import { RootReducer } from '../../store/rootReducer';


interface BaseConfigPageProps {
  radius: number,
  setBaseConfigRadius: (radius: number) => void,
}

class BaseConfigPage extends React.PureComponent<BaseConfigPageProps> {
  handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setBaseConfigRadius(evt.target.valueAsNumber);
  };

  render() {
    return (
      <section>
        <label htmlFor="configSearchRadius">
          Search radius, meters
          <input
            id="configSearchRadius"
            type="number"
            onChange={this.handleChange}
            defaultValue={'' + this.props.radius}
          />
        </label>
        <Link
          to="/"
          style={{ position: 'absolute' }}
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

export default connect(
  mapStateToProps,
  {
    setBaseConfigRadius,
    resetBaseConfigRadius,
  },
)(BaseConfigPage);
