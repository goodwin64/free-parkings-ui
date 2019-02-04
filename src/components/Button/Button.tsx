import React from 'react';
import PropTypes from 'prop-types';

import * as css from './styles.module.css';


interface ButtonProps {
  disabled?: boolean,
  className?: string,
  onClick?: () => void,
}

class Button extends React.PureComponent<ButtonProps> {
  static propTypes = {
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
  };

  render() {
    return (
      <button
        {...this.props}
        className={[css['button'], this.props.className].join(' ')}
        onClick={this.props.disabled ? undefined : this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
