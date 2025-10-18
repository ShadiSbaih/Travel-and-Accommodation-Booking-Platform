/**
 * Filter State Types
 * Defines the shape of the amenities filter state in Redux
 */

export interface FilterState {
    selectedAmenities: string[];
    filterMode: 'any' | 'all';
}

// Re-export for backwards compatibility with existing components
export type FilterMode = 'any' | 'all';
