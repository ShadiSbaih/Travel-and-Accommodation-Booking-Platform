import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SearchResultDTO } from '@/types/api/hotel.types';

export function useAmenitiesFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get selected amenities from URL
  const selectedAmenities = useMemo(() => {
    const amenitiesParam = searchParams.get('amenities');
    return amenitiesParam ? amenitiesParam.split(',').filter(Boolean) : [];
  }, [searchParams]);

  // Update selected amenities in URL
  const setSelectedAmenities = useCallback((amenities: string[]) => {
    setSearchParams((params) => {
      if (amenities.length > 0) {
        params.set('amenities', amenities.join(','));
      } else {
        params.delete('amenities');
      }
      return params;
    });
  }, [setSearchParams]);

  // Toggle a single amenity
  const toggleAmenity = useCallback((amenityName: string) => {
    const isSelected = selectedAmenities.includes(amenityName);
    
    if (isSelected) {
      setSelectedAmenities(selectedAmenities.filter(name => name !== amenityName));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityName]);
    }
  }, [selectedAmenities, setSelectedAmenities]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedAmenities([]);
  }, [setSelectedAmenities]);

  // Filter hotels based on selected amenities
  const filterHotels = useCallback((hotels: SearchResultDTO[]) => {
    if (!selectedAmenities.length) {
      return hotels;
    }

    return hotels.filter(hotel => {
      // Check if hotel has at least one of the selected amenities
      return selectedAmenities.some(selectedAmenity =>
        hotel.amenities.some(hotelAmenity => 
          hotelAmenity.name.toLowerCase().trim() === selectedAmenity.toLowerCase().trim()
        )
      );
    });
  }, [selectedAmenities]);

  return {
    selectedAmenities,
    setSelectedAmenities,
    toggleAmenity,
    clearAllFilters,
    filterHotels,
    hasActiveFilters: selectedAmenities.length > 0,
  };
}