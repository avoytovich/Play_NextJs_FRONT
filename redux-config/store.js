import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import runtime from './runtime';
import localization from './localization';

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({ runtime, localization }),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}
