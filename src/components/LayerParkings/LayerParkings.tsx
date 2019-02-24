import React from 'react';
import { Feature, Layer } from 'react-mapbox-gl';

import { COLORS } from '../../constants/colors';
import withMap, { MapContextProps } from '../Map/context';
import { FreeParking } from '../../interfaces/FreeParking';
import { ParkopediaParking } from '../../interfaces/ParkopediaParking';


export type openPopup = (p: ParkopediaParking | FreeParking) => void;
interface ParkingsLayerProps extends MapContextProps {
  parkings: ParkopediaParking[],
  freeParkings: FreeParking[],
  zoomLevel: number,
  openPopup: openPopup,
  closePopup: () => void,
}

class ParkingsLayer extends React.PureComponent<ParkingsLayerProps> {
  static allParkingsLayerId = 'all-parkings-layer';
  static freeParkingsLayerId = 'free-parkings-layer';
  static allParkingsClickableAreaLayerId = 'all-parkings-clickable-layer';
  static freeParkingsClickableAreaLayerId = 'free-parkings-clickable-layer';

  static lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };

  static getLinePaint(zoomLevel: number, isFreeParking: boolean, isClickableArea: boolean) {
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
    if (isClickableArea) {
      lineWidth *= 3;
    }

    const lineColor = (
      isClickableArea
        ? 'transparent'
        : isFreeParking
          ? COLORS.greenParking
          : COLORS.blueParking
    );

    return {
      'line-color': lineColor,
      'line-width': lineWidth,
    };
  }

  onMouseOver: openPopup = (parking) => {
    this.props.openPopup(parking);
    const canvasContainer = this.props.MapboxMap.getCanvasContainer();
    canvasContainer.style.cursor = 'pointer';
  };

  onMouseOut = () => {
    this.props.closePopup();
    const canvas = this.props.MapboxMap.getCanvasContainer();
    canvas.style.cursor = '';
  };

  renderAllParkings() {
    return (
      <Layer
        type="line"
        layout={ParkingsLayer.lineLayout}
        paint={ParkingsLayer.getLinePaint(this.props.zoomLevel, false, false)}
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

  renderAllParkingsClickableArea() {
    return (
      <Layer
        type="line"
        layout={ParkingsLayer.lineLayout}
        paint={ParkingsLayer.getLinePaint(this.props.zoomLevel, false, true)}
        id={ParkingsLayer.allParkingsClickableAreaLayerId}
      >
        {
          this.props.parkings.map((parking) => (
            <Feature
              key={parking.id}
              coordinates={parking.parkingGeometry}
              onMouseEnter={() => this.onMouseOver(parking)}
              onMouseLeave={this.onMouseOut}
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
        paint={ParkingsLayer.getLinePaint(this.props.zoomLevel, true, false)}
        id={ParkingsLayer.freeParkingsLayerId}
      >
        {
          this.props.freeParkings.map((freeParking) => (
            <Feature
              key={freeParking.id}
              coordinates={freeParking.parkingGeometry}
            />
          ))
        }
      </Layer>
    );
  }

  renderFreeParkingsClickableArea() {
    return (
      <Layer
        type="line"
        layout={ParkingsLayer.lineLayout}
        paint={ParkingsLayer.getLinePaint(this.props.zoomLevel, true, true)}
        id={ParkingsLayer.freeParkingsClickableAreaLayerId}
      >
        {
          this.props.freeParkings.map((parking) => (
            <Feature
              key={parking.id}
              coordinates={parking.parkingGeometry}
              onMouseEnter={() => this.onMouseOver(parking)}
              onMouseLeave={this.onMouseOut}
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
        { this.renderAllParkingsClickableArea() }
        { this.renderFreeParkings() }
        { this.renderFreeParkingsClickableArea() }
      </React.Fragment>
    );
  }
}

export default withMap(ParkingsLayer);
