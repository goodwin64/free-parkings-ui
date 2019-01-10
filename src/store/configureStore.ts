import createSagaMiddleware from 'redux-saga';
import { History, LocationState } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialSaga from './rootSaga';
import createRootReducer from './rootReducer';
// import monitorReducersEnhancer from './monitorReducer'; // enable to investigate Redux performance


export default function configureStore(history: History<LocationState>) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer/*, monitorReducersEnhancer*/];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    createRootReducer(history),
    undefined,
    composedEnhancers,
  );

  sagaMiddleware.run(initialSaga);

  return store;
}
