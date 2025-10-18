/**
 * Filter Feature Index
 * Centralized exports for the filters feature
 */

export { default as filterReducer } from './filterSlice';
export { toggleAmenity, clearFilters, setMode } from './filterSlice';
export type { FilterState, FilterMode } from './types';
export { DEFAULT_FILTER_CONFIG, FILTER_ACTION_TYPES } from './constants';
