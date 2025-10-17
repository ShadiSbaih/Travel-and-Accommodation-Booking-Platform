import { useContext } from 'react';
import { FilterContext } from './Filter';

// Custom hook
export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

// Helper hooks for specific actions
export function useFilterActions() {
  const context = useFilter();
  const { dispatch } = context;
  
  return {
    toggleAmenity: (amenityName: string) => {
      dispatch({ type: 'TOGGLE_AMENITY', payload: amenityName });
    },
    setAmenities: (amenities: string[]) => {
      dispatch({ type: 'SET_AMENITIES', payload: amenities });
    },
    clearFilters: () => {
      dispatch({ type: 'CLEAR_FILTERS' });
    },
    setFilterMode: (mode: 'any' | 'all') => {
      dispatch({ type: 'SET_FILTER_MODE', payload: mode });
    }
  };
}