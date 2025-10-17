import type { FilterState, FilterAction } from './types';
import { DEFAULT_FILTER_CONFIG, FILTER_ACTION_TYPES } from './constants';

export const initialFilterState: FilterState = {
  selectedAmenities: DEFAULT_FILTER_CONFIG.SELECTED_AMENITIES,
  filterMode: DEFAULT_FILTER_CONFIG.MODE
};

export function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case FILTER_ACTION_TYPES.TOGGLE_AMENITY: {
      const amenityName = action.payload;
      const isSelected = state.selectedAmenities.includes(amenityName);
      return {
        ...state,
        selectedAmenities: isSelected
          ? state.selectedAmenities.filter(name => name !== amenityName)
          : [...state.selectedAmenities, amenityName]
      };
    }
    
    case FILTER_ACTION_TYPES.SET_AMENITIES:
      return {
        ...state,
        selectedAmenities: action.payload
      };
    
    case FILTER_ACTION_TYPES.CLEAR_FILTERS:
      return {
        ...state,
        selectedAmenities: DEFAULT_FILTER_CONFIG.SELECTED_AMENITIES
      };
    
    case FILTER_ACTION_TYPES.SET_FILTER_MODE:
      return {
        ...state,
        filterMode: action.payload
      };
    
    default:
      return state;
  }
}