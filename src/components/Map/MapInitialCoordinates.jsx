import React from 'react';
import Map from 'src/components/Map/Map';

export class InitialCoordinatesMap extends React.PureComponent {
  static propTypes = {
    initialCoordinates: PropTypes.shape({
      zoom: PropTypes.number.isRequired,
      center: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    mapRef: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.initialCoordinates = props.initialCoordinates;
  }

  render() {
    const { mapRef, initialCoordinates, ...restProps } = this.props;
    return <Map ref={mapRef} {...this.initialCoordinates} {...restProps} />;
  }
}