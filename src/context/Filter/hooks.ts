import { useContext } from 'react';
import { FilterContext } from './FilterContext';
import { FILTER_ACTION_TYPES } from './constants';
import type { FilterMode } from './types';

/**
 * Custom hook to access filter context
 * @throws Error if used outside FilterProvider
 */
export function useFilterAmenities() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterAmenities must be used within a FilterProvider');
  }
  return context;
}

/**
 * Helper hooks for specific filter actions
 */
export function useFilterAmenitiesActions() {
  const context = useFilterAmenities();
  const { dispatch } = context;
  
  return {
    /**
     * Toggle a single amenity filter
     */
    toggleAmenity: (amenityName: string) => {
      dispatch({ type: FILTER_ACTION_TYPES.TOGGLE_AMENITY, payload: amenityName });
    },
    
    /**
     * Set multiple amenities at once
     */
    setAmenities: (amenities: string[]) => {
      dispatch({ type: FILTER_ACTION_TYPES.SET_AMENITIES, payload: amenities });
    },
    
    /**
     * Clear all active filters
     */
    clearFilters: () => {
      dispatch({ type: FILTER_ACTION_TYPES.CLEAR_FILTERS });
    },
    
    /**
     * Set the filter mode (any vs all)
     */
    setFilterMode: (mode: FilterMode) => {
      dispatch({ type: FILTER_ACTION_TYPES.SET_FILTER_MODE, payload: mode });
    }
  };
}

/**
 * Hook to get filter state values
 */
export function useFilterAmenitiesState() {
  const { state, hasActiveFilters } = useFilterAmenities();
  
  return {
    selectedAmenities: state.selectedAmenities,
    filterMode: state.filterMode,
    hasActiveFilters
  };
}

/**
 * Hook specifically for hotel filtering functionality
 */
export function useHotelFiltering() {
  const { filterHotels } = useFilterAmenities();
  
  return {
    filterHotels
  };
}