import { useReducer } from 'react';
import type { FilterProviderProps } from './types';
import { FilterContext } from './FilterContext';
import { filterReducer, initialFilterState } from './reducer';
import { filterHotelsByAmenities, hasActiveFilters } from './utils';

// Provider component
export function FilterProvider({ children }: FilterProviderProps) {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  const contextValue = {
    state,
    dispatch,
    filterHotels: (hotels: Parameters<typeof filterHotelsByAmenities>[0]) => 
      filterHotelsByAmenities(hotels, state),
    hasActiveFilters: hasActiveFilters(state)
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}