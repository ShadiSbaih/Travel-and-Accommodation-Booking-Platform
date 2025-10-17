import type { SearchResultDTO } from '@/types/api/hotel.types';
import type { FilterState } from './types';

/**
 * Filter hotels based on selected amenities and filter mode
 */
export function filterHotelsByAmenities(
  hotels: SearchResultDTO[], 
  filterState: FilterState
): SearchResultDTO[] {
  if (!hotels || !filterState.selectedAmenities.length) {
    return hotels || [];
  }

  console.log('🔍 Filtering hotels:', {
    totalHotels: hotels.length,
    selectedAmenities: filterState.selectedAmenities,
    filterMode: filterState.filterMode
  });

  return hotels.filter(hotel => {
    if (!hotel.amenities || !Array.isArray(hotel.amenities)) {
      console.log(`⚠️ Hotel ${hotel.hotelName} has no amenities`);
      return false;
    }

    const hotelAmenityNames = hotel.amenities
      .map(amenity => amenity.name?.toLowerCase().trim())
      .filter(Boolean);

    console.log(`🏨 ${hotel.hotelName} amenities:`, hotelAmenityNames);

    if (filterState.filterMode === 'all') {
      // Must have ALL selected amenities
      const hasAllAmenities = filterState.selectedAmenities.every(selectedAmenity =>
        hotelAmenityNames.some(hotelAmenity =>
          isAmenityMatch(hotelAmenity, selectedAmenity)
        )
      );
      console.log(`✓ Has all amenities: ${hasAllAmenities}`);
      return hasAllAmenities;
    } else {
      // Must have AT LEAST ONE selected amenity
      const hasAnyAmenity = filterState.selectedAmenities.some(selectedAmenity =>
        hotelAmenityNames.some(hotelAmenity =>
          isAmenityMatch(hotelAmenity, selectedAmenity)
        )
      );
      console.log(`✓ Has any amenity: ${hasAnyAmenity}`);
      return hasAnyAmenity;
    }
  });
}

/**
 * Check if hotel amenity matches selected amenity (fuzzy matching)
 */
function isAmenityMatch(hotelAmenity: string, selectedAmenity: string): boolean {
  const normalizedHotel = hotelAmenity.toLowerCase().trim();
  const normalizedSelected = selectedAmenity.toLowerCase().trim();
  
  return normalizedHotel.includes(normalizedSelected) || 
         normalizedSelected.includes(normalizedHotel);
}

/**
 * Check if any filters are currently active
 */
export function hasActiveFilters(filterState: FilterState): boolean {
  return filterState.selectedAmenities.length > 0;
}