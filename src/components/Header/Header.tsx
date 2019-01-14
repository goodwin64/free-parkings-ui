import { Route, Switch } from 'react-router';
import BaseConfigPage from '../../containers/BaseConfigPage/BaseConfigPage';
import { Link } from 'react-router-dom';
import React from 'react';


export default class Header extends React.PureComponent {
  render() {
    return (
      <header>
        <Switch>
          <Route
            exact
            path="/config"
            // @ts-ignore
            component={BaseConfigPage}
          />
          <Route
            path="/"
            render={() => (
              <Link
                to="/config"
                style={{ position: 'absolute' }}
              >
                <button>config</button>
              </Link>
            )}
          />
        </Switch>
      </header>
    )
  }
}