import { useContext } from 'react';
import { FilterContext } from './Filter';

// Custom hook
export function useFilterAmenities() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilterAmenities must be used within a FilterProvider');
  }
  return context;
}

// Helper hooks for specific actions
export function useFilterAmenitiesActions() {
  const context = useFilterAmenities();
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