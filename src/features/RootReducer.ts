/**
 * Root Reducer
 * Combines all feature reducers into a single root reducer
 */

import { combineReducers } from '@reduxjs/toolkit';
import filterReducer from './filters/filterSlice';
import searchReducer from '../store/searchSlice';

/**
 * Root reducer combining all slice reducers
 */
const RootReducer = combineReducers({
  filters: filterReducer,
  search: searchReducer,
});

export default RootReducer;
