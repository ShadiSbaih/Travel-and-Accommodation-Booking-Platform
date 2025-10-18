/**
 * Filter Constants
 * Centralized configuration and action types for the filter system
 */

import type { FilterState } from './filterSlice.types';

/**
 * Default filter configuration
 * Used to initialize and reset filter state
 */
export const DEFAULT_FILTER_CONFIG: FilterState = {
    selectedAmenities: [],
    filterMode: 'any',
} as const;

/**
 * Filter action type identifiers
 * Used for debugging and potential middleware integration
 */
export const FILTER_ACTION_TYPES = {
    TOGGLE_AMENITY: 'filters/toggleAmenity',
    CLEAR_FILTERS: 'filters/clearFilters',
    SET_MODE: 'filters/setMode',
} as const;
