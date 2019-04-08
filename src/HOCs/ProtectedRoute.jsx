import React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import UrlService from '../services/Url.service';


const ProtectedRoute = ({ component: Component, authorized, redirectPath, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authorized ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
  location: PropTypes.object,
};

ProtectedRoute.defaultProps = {
  redirectPath: UrlService.loginPageUrl,
};

export default ProtectedRoute;
