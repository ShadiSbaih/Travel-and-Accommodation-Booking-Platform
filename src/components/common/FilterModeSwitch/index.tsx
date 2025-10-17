import React from 'react';
import { useAmenitiesFilter } from '@/context/AmenitiesFilter';

/**
 * Filter Mode Switch Component
 * Toggles between "Any Match" and "All Match" filtering modes
 * Uses context to avoid prop drilling
 */
const FilterModeSwitch: React.FC = () => {
  const { filterMode, setFilterMode, selectedAmenities } = useAmenitiesFilter();
  const disabled = selectedAmenities.length === 0;

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600 mb-2">Match Mode:</p>
      <div className="flex space-x-1 bg-white rounded-md p-1 border">
        <button
          onClick={() => setFilterMode('any')}
          disabled={disabled}
          className={`px-3 py-1 text-sm rounded transition-all ${
            filterMode === 'any'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          Any Match
        </button>
        <button
          onClick={() => setFilterMode('all')}
          disabled={disabled}
          className={`px-3 py-1 text-sm rounded transition-all ${
            filterMode === 'all'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          All Match
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {filterMode === 'any'
          ? 'Hotels with at least one selected amenity'
          : 'Hotels with all selected amenities'}
      </p>
    </div>
  );
};

export default FilterModeSwitch;