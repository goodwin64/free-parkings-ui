import React from 'react';
import { Feature, Layer } from 'react-mapbox-gl';

import { Parking } from '../../interfaces/Parking';
import { FreeSlot } from '../../interfaces/FreeSlot';


interface ParkingsLayerProps {
  parkings: Parking[],
  freeParkings: FreeSlot[],
  zoomLevel: number,
}

export class ParkingsLayer extends React.PureComponent<ParkingsLayerProps> {
  static allParkingsLayerId = 'all-parkings-layer';
  static freeParkingsLayerId = 'free-parkings-layer';

  static lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };

  static getLinePaint(zoomLevel: number, isFreeParking: boolean) {
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
    if (isFreeParking) {
      lineWidth += 2;
    }

    return {
      'line-color': isFreeParking ? '#68ce55' : '#4790E5',
      'line-width': lineWidth,
    };
  }

  renderAllParkings() {
    return (
      <Layer
        type="line"
        layout={ParkingsLayer.lineLayout}
        paint={ParkingsLayer.getLinePaint(this.props.zoomLevel, false)}
        id={ParkingsLayer.allParkingsLayerId}
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

  renderFreeParkings() {
    return (
      <Layer
        type="line"
        layout={ParkingsLayer.lineLayout}
        paint={ParkingsLayer.getLinePaint(this.props.zoomLevel, true)}
        id={ParkingsLayer.freeParkingsLayerId}
      >
        {
          this.props.freeParkings.map((freeParking) => (
            <Feature
              key={freeParking.id}
              coordinates={freeParking.freeSlotsGeometry}
            />
          ))
        }
      </Layer>
    );
  }

  render() {
    return (
      <React.Fragment>
        { this.renderAllParkings() }
        { this.renderFreeParkings() }
      </React.Fragment>
    );
  }
}