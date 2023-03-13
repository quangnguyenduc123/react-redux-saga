import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';
import userManagement from './reducers/userManagement';
import rootSaga from './sagas';

import {  localizeReducer } from 'react-localize-redux';

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();
// Create ComposeEnhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  userManagement: userManagement,
  localize: localizeReducer
});

// Create Store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
