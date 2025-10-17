import React from 'react';
import { useAmenitiesFilter } from '@/context/AmenitiesFilter';

interface FilterStatisticsProps {
  filteredCount: number;
  totalCount: number;
}

/**
 * Filter Statistics Component
 * Displays filtering results and selected amenities as tags
 * Uses context for amenities state
 */
const FilterStatistics: React.FC<FilterStatisticsProps> = ({
  filteredCount,
  totalCount,
}) => {
  const { selectedAmenities, filterMode } = useAmenitiesFilter();
  
  // Don't render if no filters are active
  if (selectedAmenities.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-blue-800 text-sm">
            🔍 Found <strong>{filteredCount}</strong> hotel{filteredCount !== 1 ? 's' : ''}
            out of <strong>{totalCount}</strong> total hotel{totalCount !== 1 ? 's' : ''}
            {selectedAmenities.length > 1 && (
              <span className="ml-1">
                with <strong>{filterMode === 'any' ? 'any' : 'all'}</strong> of the selected amenities
              </span>
            )}
            {selectedAmenities.length === 1 && (
              <span className="ml-1">with the selected amenity</span>
            )}
          </p>
          
          {/* Selected amenities tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedAmenities.map(amenity => (
              <span 
                key={amenity}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterStatistics;