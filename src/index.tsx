import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import './index.global.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { history } from './store/history';


const store = configureStore(history);

// @ts-ignore
const renderApp = () => <App />;

// TS check hack
const AppConnected = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { renderApp() }
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<AppConnected/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
