import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer              from 'business/reducers';
import indexSagas              from 'business/sagas';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const enhancers = [applyMiddleware(sagaMiddleware)];

// DevTools Extension for debugging in Chrome
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

sagaMiddleware.run(indexSagas);

export default store;
