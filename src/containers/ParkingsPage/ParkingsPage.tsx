import React from 'react';
import { Feature, Layer } from 'react-mapbox-gl';


class AllParkingsLayer extends React.PureComponent {
  static layerId = 'all-parkings-layer';

  static mockPolyline1 = [
    {
      'lat': -0.018423,
      'lng': 51.473246,
    },
    {
      'lat': -0.218819,
      'lng': 51.47334,
    },
    {
      'lat': -0.819222,
      'lng': 51.47347,
    },
    {
      'lat': 0.21195,
      'lng': 51.474258,
    },
  ].map(point => [point.lat, point.lng]);
  static mockPolyline2 = [
    [2.35, 48.85],
    [2.25, 48.75],
    [2.45, 48.65],
    [2.85, 48.55],
  ];

  static lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };

  static linePaint = {
    'line-color': '#4790E5',
    'line-width': 12,
  };

  render() {
    return (
      <Layer
        type="line"
        layout={AllParkingsLayer.lineLayout}
        paint={AllParkingsLayer.linePaint}
        id={AllParkingsLayer.layerId}
      >
        <Feature coordinates={AllParkingsLayer.mockPolyline1}/>
        <Feature coordinates={AllParkingsLayer.mockPolyline2}/>
      </Layer>
    );
  }
}

class ParkingsPage extends React.Component {
  static defaultProps = {};

  render() {
    return (
      <React.Fragment>
        <AllParkingsLayer/>
      </React.Fragment>
    );
  }
}

export default ParkingsPage;