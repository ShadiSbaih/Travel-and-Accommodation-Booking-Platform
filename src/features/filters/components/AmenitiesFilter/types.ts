export interface AmenitiesFilterProps {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
  filterMode: 'any' | 'all';
  onFilterModeChange: (mode: 'any' | 'all') => void;
}