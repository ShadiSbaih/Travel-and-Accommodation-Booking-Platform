/**
 * Search utility functions for filtering hotels
 */

import type { SearchResultDTO } from '@/features/hotels/types';

/**
 * Filter hotels by amenities based on selected amenities and filter mode
 * @param hotels - Array of hotels to filter
 * @param selectedAmenities - Array of selected amenity names
 * @param filterMode - Filter mode: 'any' (OR) or 'all' (AND)
 * @returns Filtered array of hotels
 */
export const filterHotelsByAmenities = (
  hotels: SearchResultDTO[],
  selectedAmenities: string[],
  filterMode: 'any' | 'all'
): SearchResultDTO[] => {
  if (!selectedAmenities.length) return hotels;

  return hotels.filter((hotel) => {
    const names = hotel.amenities?.map((a) => a.name?.toLowerCase().trim()) || [];
    
    if (filterMode === 'any') {
      return selectedAmenities.some((a) =>
        names.some((n) => n?.includes(a.toLowerCase()))
      );
    }
    
    return selectedAmenities.every((a) =>
      names.some((n) => n?.includes(a.toLowerCase()))
    );
  });
};
