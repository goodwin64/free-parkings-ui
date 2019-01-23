import React from 'react';
import { Feature, Layer } from 'react-mapbox-gl';
import { Parking } from '../../interfaces/Parking';


interface ParkingsLayerProps {
  parkings: Parking[],
  zoomLevel: number,
}

export class ParkingsLayer extends React.PureComponent<ParkingsLayerProps> {
  static layerId = 'all-parkings-layer';

  static lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };

  static getLinePaint(zoomLevel: number) {
    console.log('zoomLevel', zoomLevel);
    let lineWidth;
    if (zoomLevel < 14.5) {
      lineWidth = 1;
    } else if (zoomLevel < 15) {
      lineWidth = 2;
    } else if (zoomLevel < 15.5) {
      lineWidth = 3;
    } else if (zoomLevel < 16) {
      lineWidth = 4;
    } else {
      lineWidth = 5;
    }

    return {
      'line-color': '#4790E5',
      'line-width': lineWidth,
    };
  }

  render() {
    return (
      <Layer
        type="line"
        layout={ParkingsLayer.lineLayout}
        paint={ParkingsLayer.getLinePaint(this.props.zoomLevel)}
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