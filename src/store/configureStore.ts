import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History, LocationState } from 'history';

import initialSaga from './rootSaga';
import createRootReducer from './rootReducer';
import monitorReducersEnhancer from './monitorReducer';


export default function configureStore(history: History<LocationState>) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    createRootReducer(history),
    undefined,
    composedEnhancers,
  );

  sagaMiddleware.run(initialSaga);

  return store;
}
