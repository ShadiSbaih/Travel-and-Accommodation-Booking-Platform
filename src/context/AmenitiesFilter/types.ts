export interface AmenitiesFilterState {
  selectedAmenities: string[];
  filterMode: 'any' | 'all';
}

export interface AmenitiesFilterActions {
  setSelectedAmenities: (amenities: string[]) => void;
  setFilterMode: (mode: 'any' | 'all') => void;
  toggleAmenity: (amenity: string) => void;
  clearAllAmenities: () => void;
}

export interface AmenitiesFilterContextType extends AmenitiesFilterState, AmenitiesFilterActions {}