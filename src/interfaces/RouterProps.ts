import { match } from 'react-router';
import { History, Location, LocationState } from 'history';


export interface RouterProps {
  history: History<LocationState>,
  location: Location,
  match: match<any>,
}
