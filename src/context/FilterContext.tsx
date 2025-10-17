import React, { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { SearchResultDTO } from '@/types/api/hotel.types';

// Types
interface FilterState {
  selectedAmenities: string[];
  filterMode: 'any' | 'all';
}

type FilterAction = 
  | { type: 'TOGGLE_AMENITY'; payload: string }
  | { type: 'SET_AMENITIES'; payload: string[] }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_FILTER_MODE'; payload: 'any' | 'all' };

interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  filterHotels: (hotels: SearchResultDTO[]) => SearchResultDTO[];
  hasActiveFilters: boolean;
}

// Initial state
const initialState: FilterState = {
  selectedAmenities: [],
  filterMode: 'any'
};

// Reducer
function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'TOGGLE_AMENITY': {
      const amenityName = action.payload;
      const isSelected = state.selectedAmenities.includes(amenityName);
      return {
        ...state,
        selectedAmenities: isSelected
          ? state.selectedAmenities.filter(name => name !== amenityName)
          : [...state.selectedAmenities, amenityName]
      };
    }
    
    case 'SET_AMENITIES':
      return {
        ...state,
        selectedAmenities: action.payload
      };
    
    case 'CLEAR_FILTERS':
      return {
        ...state,
        selectedAmenities: []
      };
    
    case 'SET_FILTER_MODE':
      return {
        ...state,
        filterMode: action.payload
      };
    
    default:
      return state;
  }
}

// Context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider component
interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // Filter function
  const filterHotels = (hotels: SearchResultDTO[]): SearchResultDTO[] => {
    if (!hotels || !state.selectedAmenities.length) {
      return hotels || [];
    }

    console.log('🔍 Filtering with Context API:', {
      totalHotels: hotels.length,
      selectedAmenities: state.selectedAmenities,
      filterMode: state.filterMode
    });

    return hotels.filter(hotel => {
      if (!hotel.amenities || !Array.isArray(hotel.amenities)) {
        console.log(`⚠️ Hotel ${hotel.hotelName} has no amenities`);
        return false;
      }

      const hotelAmenityNames = hotel.amenities
        .map(a => a.name?.toLowerCase().trim())
        .filter(Boolean);

      console.log(`🏨 ${hotel.hotelName} amenities:`, hotelAmenityNames);

      if (state.filterMode === 'all') {
        // Must have ALL selected amenities
        const hasAllAmenities = state.selectedAmenities.every(selectedAmenity =>
          hotelAmenityNames.some(hotelAmenity =>
            hotelAmenity.includes(selectedAmenity.toLowerCase().trim()) ||
            selectedAmenity.toLowerCase().trim().includes(hotelAmenity)
          )
        );
        console.log(`✓ Has all amenities: ${hasAllAmenities}`);
        return hasAllAmenities;
      } else {
        // Must have AT LEAST ONE selected amenity
        const hasAnyAmenity = state.selectedAmenities.some(selectedAmenity =>
          hotelAmenityNames.some(hotelAmenity =>
            hotelAmenity.includes(selectedAmenity.toLowerCase().trim()) ||
            selectedAmenity.toLowerCase().trim().includes(hotelAmenity)
          )
        );
        console.log(`✓ Has any amenity: ${hasAnyAmenity}`);
        return hasAnyAmenity;
      }
    });
  };

  const hasActiveFilters = state.selectedAmenities.length > 0;

  const contextValue: FilterContextType = {
    state,
    dispatch,
    filterHotels,
    hasActiveFilters
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

// Export context for hooks
export { FilterContext };