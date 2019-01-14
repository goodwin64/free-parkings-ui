export const BASE_CONFIG_RADIUS_SET = 'config/BASE_CONFIG_RADIUS_SET';
export const BASE_CONFIG_RADIUS_RESET = 'config/BASE_CONFIG_RADIUS_RESET';

/**
 * Used to detect whether to fetch parkings.
 * If user sees map with size g.t. [this value * 2], in other words, city zoom level,
 * do not send request for parkings.
 */
export const MAX_SEARCH_RADIUS_TO_FETCH = 1000;

export const INITIAL_SEARCH_RADIUS = 2000;
export const PARIS_CENTER_LAT = 48.855796;
export const PARIS_CENTER_LON = 2.356566;
