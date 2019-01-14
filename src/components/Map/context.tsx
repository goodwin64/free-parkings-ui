import * as React from 'react';
import mapboxgl from 'mapbox-gl'

export const MapContext = React.createContext(null) as React.Context<mapboxgl.Map | null>;

export interface MapContextProps {
    MapboxMap: mapboxgl.Map
}

const withMap = (Component: React.ComponentClass<any>) => {
    return function MappedComponent<T>(props: T) {
        return (
            <MapContext.Consumer>
                {map => <Component MapboxMap={map} {...props} />}
            </MapContext.Consumer>
        );
    };
};

export default withMap;
