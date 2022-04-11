/**
 * 
 * @description Creates a single Redux reducer.
 *  Only a single reducer is currently included, but this allows scalability.
 * 
 */

import { combineReducers } from 'redux';
import characterSheetReducer from './characterSheetReducer';

const rootReducer = combineReducers({ 
  characterSheet: characterSheetReducer,
});

export default rootReducer;