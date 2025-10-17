import type { SearchResultDTO } from '@/types/api/hotel.types';
import type { FILTER_MODES, FILTER_ACTION_TYPES } from './constants';

export type FilterMode = typeof FILTER_MODES[keyof typeof FILTER_MODES];

export interface FilterState {
  selectedAmenities: string[];
  filterMode: FilterMode;
}

export type FilterAction = 
  | { type: typeof FILTER_ACTION_TYPES.TOGGLE_AMENITY; payload: string }
  | { type: typeof FILTER_ACTION_TYPES.SET_AMENITIES; payload: string[] }
  | { type: typeof FILTER_ACTION_TYPES.CLEAR_FILTERS }
  | { type: typeof FILTER_ACTION_TYPES.SET_FILTER_MODE; payload: FilterMode };

export interface FilterContextType {
  state: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  filterHotels: (hotels: SearchResultDTO[]) => SearchResultDTO[];
  hasActiveFilters: boolean;
}

export interface FilterProviderProps {
  children: React.ReactNode;
}