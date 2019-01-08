import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';


const history = createBrowserHistory();
const store = configureStore(history);

// @ts-ignore
const AppConnected = () => (<Provider store={store}><Router history={history}><App /></Router></Provider>);

ReactDOM.render(<AppConnected/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
