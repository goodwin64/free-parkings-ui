import React from 'react';
import * as PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import UrlService from '../services/Url.service';


const ProtectedRoute = ({ component: Component, allowed, RedirectComponent = null, redirectPath = '', ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      allowed
        ? <Component {...props} />
        : RedirectComponent ? <RedirectComponent/> : (
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
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  allowed: PropTypes.bool.isRequired,
  redirectPath: PropTypes.string,
  redirectComponent: PropTypes.any,
  location: PropTypes.object,
};

ProtectedRoute.defaultProps = {
  redirectPath: UrlService.loginPageUrl,
  redirectComponent: null,
};

export default ProtectedRoute;
