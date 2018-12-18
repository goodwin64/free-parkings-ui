import React from 'react';

import './ControlPanel.css';

const CITIES = [
  {
    "city":"Los Angeles",
    "latitude":34.0194,
    "longitude":-118.4108,
  },
  {
    "city":"Tokyo",
    "latitude":35.6895,
    "longitude":139.6917,
  },
  {
    "city":"Paris",
    "latitude":48.8587,
    "longitude":2.3569,
  },
];

const defaultContainer =  ({children}) => <div className="control-panel">{children}</div>;

export default class ControlPanelCities extends React.PureComponent {

  renderCity = (city, index) => {
    return (
      <div key={`btn-${index}`} className="input">
        <input
          type="radio"
          name="city"
          id={`city-${index}`}
          defaultChecked={city.city === 'Paris'}
          onClick={() => this.props.onViewportChange(city)}
        />
        <label htmlFor={`city-${index}`}>
          {city.city}
        </label>
      </div>
    );
  };

  render() {
    const Container = this.props.containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Camera Transition</h3>
        <p>Navigate between cities</p>
        <hr />
        { CITIES.map(this.renderCity) }
      </Container>
    );
  }
}