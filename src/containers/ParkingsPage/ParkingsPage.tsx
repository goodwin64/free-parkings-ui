import React from 'react';
import { Route, Switch } from 'react-router';

import ParkingsMap from './ParkingsMap';
import UrlService from '../../services/Url.service';
import ParkingsPageMapContent from './ParkingsPageMapContent';
import PostParkingPage from '../PostParkingPage/PostParkingPageMapContent';


function ParkingsPage() {
  return (
    <ParkingsMap>
      <Switch>
        <Route
          path={UrlService.findParkingsPageUrl}
          // @ts-ignore
          component={ParkingsPageMapContent}
        />
        <Route
          path={UrlService.createParkingPageUrl}
          // @ts-ignore
          component={PostParkingPage}
        />
        <Route
          path={UrlService.editParkingPageUrlRoute}
          // @ts-ignore
          component={PostParkingPage}
        />
      </Switch>
    </ParkingsMap>
  );
}

export default ParkingsPage;
