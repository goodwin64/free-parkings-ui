export const BASE_CONFIG_RADIUS_SET = 'config/BASE_CONFIG_RADIUS_SET';
export const BASE_CONFIG_RADIUS_RESET = 'config/BASE_CONFIG_RADIUS_RESET';
export const BASE_CONFIG_OPEN_SIDEBAR = 'config/BASE_CONFIG_OPEN_SIDEBAR';
export const BASE_CONFIG_CLOSE_SIDEBAR = 'config/BASE_CONFIG_CLOSE_SIDEBAR';

/**
 * Used to detect whether to fetch parkings.
 * If user sees map with size g.t. [this value * 2], in other words, city zoom level,
 * do not send request for parkings.
 */
export const MAX_SEARCH_RADIUS_TO_FETCH = 1000;

export const INITIAL_SEARCH_RADIUS = 2000;
export const KYIV_CENTER_LAT = 50.4501;
export const KYIV_CENTER_LON = 30.5234;

export const DEFAULT_ZOOM_LEVEL = 16.248; // ~600m search radius
