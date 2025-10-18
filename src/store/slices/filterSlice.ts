/**
 * Filter Slice
 * Redux Toolkit slice for managing amenities filter state
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FilterState, FilterMode } from './filterSlice.types';
import { DEFAULT_FILTER_CONFIG } from './filterSlice.constants';

/**
 * Initial state for the filter slice
 */
const initialState: FilterState = {
    selectedAmenities: DEFAULT_FILTER_CONFIG.selectedAmenities,
    filterMode: DEFAULT_FILTER_CONFIG.filterMode,
};

/**
 * Filter slice with reducers for managing amenity selections and filter mode
 */
const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        /**
         * Toggle an amenity selection
         * If the amenity exists in the array, remove it; otherwise, add it
         * @param state - Current filter state
         * @param action - Payload containing the amenity string
         */
        toggleAmenity: (state, action: PayloadAction<string>) => {
            const amenity = action.payload;
            const index = state.selectedAmenities.indexOf(amenity);

            if (index !== -1) {
                // Amenity exists, remove it
                state.selectedAmenities.splice(index, 1);
            } else {
                // Amenity doesn't exist, add it
                state.selectedAmenities.push(amenity);
            }
        },

        /**
         * Clear all selected amenities
         * Resets the selectedAmenities array to empty
         * @param state - Current filter state
         */
        clearFilters: (state) => {
            state.selectedAmenities = [];
        },

        /**
         * Set the filter mode
         * Updates the filtering logic mode (any or all)
         * @param state - Current filter state
         * @param action - Payload containing the new filter mode
         */
        setMode: (state, action: PayloadAction<FilterMode>) => {
            state.filterMode = action.payload;
        },
    },
});

// Export actions
export const { toggleAmenity, clearFilters, setMode } = filterSlice.actions;

// Export reducer
export default filterSlice.reducer;
