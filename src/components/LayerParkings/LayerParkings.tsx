import React from 'react';
import { Feature, Layer } from 'react-mapbox-gl';
import { Parking } from '../../interfaces/Parking';


interface ParkingsLayerProps {
  parkings: Parking[],
}

export class ParkingsLayer extends React.PureComponent<ParkingsLayerProps> {
  static layerId = 'all-parkings-layer';

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
        layout={ParkingsLayer.lineLayout}
        paint={ParkingsLayer.linePaint}
        id={ParkingsLayer.layerId}
      >
        {
          this.props.parkings.map((parking) => (
            <Feature
              key={parking.id}
              coordinates={parking.parkingGeometry}
            />
          ))
        }
      </Layer>
    );
  }
}