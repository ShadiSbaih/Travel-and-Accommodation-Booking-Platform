/**
 * Filter mode options
 */
export const FILTER_MODES = {
  ANY: 'any' as const,
  ALL: 'all' as const
} as const;

/**
 * Filter action types
 */
export const FILTER_ACTION_TYPES = {
  TOGGLE_AMENITY: 'TOGGLE_AMENITY' as const,
  SET_AMENITIES: 'SET_AMENITIES' as const,
  CLEAR_FILTERS: 'CLEAR_FILTERS' as const,
  SET_FILTER_MODE: 'SET_FILTER_MODE' as const
} as const;

/**
 * Default filter configuration
 */
export const DEFAULT_FILTER_CONFIG = {
  MODE: FILTER_MODES.ANY,
  SELECTED_AMENITIES: [] as string[]
} as const;