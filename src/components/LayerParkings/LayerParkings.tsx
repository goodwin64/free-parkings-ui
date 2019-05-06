import React from 'react';
import { compose } from 'redux';
import { MapMouseEvent } from 'mapbox-gl';
import { Feature, Layer } from 'react-mapbox-gl';

import { COLORS } from '../../constants/colors';
import withMap, { MapContextProps } from '../Map/context';
import { ParkopediaParking } from '../../interfaces/ParkopediaParking';
import { geometryLatLonToLonLat } from '../../utils/geometry';
import { LatLon } from '../../interfaces/LatLon';


export type openPopup = (p: ParkopediaParking, popupCoordinates: LatLon) => void;
export type openPopupDetails = (p: ParkopediaParking) => void;

interface ParkingsLayerProps extends MapContextProps {
  parkings: ParkopediaParking[],
  freeParkings: ParkopediaParking[],
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
          ? COLORS.colorAccent1
          : COLORS.colorAccent4
    );

    return {
      'line-color': lineColor,
      'line-width': lineWidth,
    };
  }

  onParkingClick = (parking: ParkopediaParking) => (e: MapMouseEvent) => {
    const popupCoordinates = { lat: e.lngLat.lat, lon: e.lngLat.lng };
    this.props.openPopup(parking, popupCoordinates);
  };

  onMouseEnter = () => {
    const canvasContainer = this.props.MapboxMap.getCanvasContainer();
    canvasContainer.style.cursor = 'pointer';
  };

  onMouseOut = () => {
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
              coordinates={geometryLatLonToLonLat(parking.geometry)}
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
              coordinates={geometryLatLonToLonLat(parking.geometry)}
              // @ts-ignore
              onClick={this.onParkingClick(parking)}
              onMouseEnter={this.onMouseEnter}
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
              coordinates={geometryLatLonToLonLat(freeParking.geometry)}
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
              coordinates={geometryLatLonToLonLat(parking.geometry)}
              // @ts-ignore
              onClick={this.onParkingClick(parking)}
              onMouseEnter={this.onMouseEnter}
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
        {this.renderAllParkings()}
        {this.renderAllParkingsClickableArea()}
        {this.renderFreeParkings()}
        {this.renderFreeParkingsClickableArea()}
      </React.Fragment>
    );
  }
}

export default compose(
  withMap,
)(ParkingsLayer);
