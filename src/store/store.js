/**
 * 
 * @description Creates a single Redux store from the combined reducers.
 * 
 */

import { createStore } from 'redux';
import reducer from '../reducers/combineReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;