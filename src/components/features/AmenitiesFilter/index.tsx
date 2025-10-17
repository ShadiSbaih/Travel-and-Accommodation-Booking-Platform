import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import amenitiesApi from '@/services/api/amenities.api';
import type { Amenity } from '@/types/api/amenities';
import FilterModeSwitch from '@/components/common/FilterModeSwitch';
import AmenitiesList from '@/components/features/AmenitiesList';
import type { AmenitiesFilterProps } from './types';

/**
 * Complete Amenities Filter Component
 * Includes API data fetching, filter mode switch, and scrollable amenities list
 */
const AmenitiesFilter: React.FC<AmenitiesFilterProps> = ({
  selectedAmenities,
  onAmenitiesChange,
  filterMode,
  onFilterModeChange,
}) => {
  // Fetch amenities from API
  const { data: amenities, isLoading, error } = useQuery<Amenity[]>({
    queryKey: ['amenities'],
    queryFn: amenitiesApi.getAmenities,
  });

  // Handle amenity toggle with smart filter mode reset
  const handleAmenityToggle = useCallback(
    (amenityName: string) => {
      const newAmenities = selectedAmenities.includes(amenityName)
        ? selectedAmenities.filter((a) => a !== amenityName)
        : [...selectedAmenities, amenityName];

      onAmenitiesChange(newAmenities);
      
      // Reset to 'any' mode when no amenities remain or only one amenity
      // (all mode doesn't make sense with ≤1 amenities)
      if (newAmenities.length <= 1 && filterMode === 'all') {
        onFilterModeChange('any');
      }
    },
    [selectedAmenities, onAmenitiesChange, filterMode, onFilterModeChange]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    onAmenitiesChange([]);
    onFilterModeChange('any'); // Reset to any mode when clearing
  }, [onAmenitiesChange, onFilterModeChange]);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Loading amenities...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <div className="text-center py-8">
            <p className="text-sm text-red-600">Failed to load amenities</p>
            <p className="text-xs text-gray-500 mt-1">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    );
  }

  // No amenities state
  if (!amenities || amenities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          <p className="text-sm text-gray-600 text-center py-8">No amenities available</p>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6 pb-4">
        {/* Header with clear button */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Amenities</h3>
          {selectedAmenities.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:underline transition-colors"
            >
              Clear All ({selectedAmenities.length})
            </button>
          )}
        </div>

        {/* Filter Mode Switch - Always visible */}
        <FilterModeSwitch
          filterMode={filterMode}
          onFilterModeChange={onFilterModeChange}
          disabled={selectedAmenities.length === 0}
        />

        {/* Scrollable Amenities List */}
        <AmenitiesList
          amenities={amenities}
          selectedAmenities={selectedAmenities}
          onAmenityToggle={handleAmenityToggle}
        />
      </div>
    </div>
  );
};

export default AmenitiesFilter;