import type { Amenity } from '@/types/api/amenities';

export interface AmenitiesListProps {
  amenities: Amenity[];
  selectedAmenities: string[];
  onAmenityToggle: (amenityName: string) => void;
}