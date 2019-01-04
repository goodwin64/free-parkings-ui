import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import initialSaga from './rootSaga';
import rootReducer from './rootReducer';
import monitorReducersEnhancer from './monitorReducer';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(
    rootReducer,
    undefined,
    composedEnhancers,
  );

  sagaMiddleware.run(initialSaga);

  return store;
}
