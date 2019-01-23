// manually filled; could be replaced by official typings
export interface MapboxPlace {
  id: string,
  type: string,
  place_type: string[],
  relevance: number,
  properties: {},
  text: string,
  place_name: string,
  matching_text: string,
  matching_place_name: string,
  center: [number, number],
  geometry: {
    type: string,
    coordinates: [number, number],
    interpolated: boolean
  },
  address: string,
}
