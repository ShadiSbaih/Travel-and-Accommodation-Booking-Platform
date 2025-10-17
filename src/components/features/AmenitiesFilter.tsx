import { useQuery } from '@tanstack/react-query';
import amenitiesApi from "@/services/api/amenities.api";
import type { Amenity } from '@/types/api/amenities';
import { useFilter, useFilterActions } from '@/context/useFilterHooks';

export default function AmenitiesFilter() {
  // Use Context API for filter management
  const { state, hasActiveFilters } = useFilter();
  const { toggleAmenity, clearFilters, setFilterMode } = useFilterActions();
  
  const { selectedAmenities, filterMode } = state;
  const { data: amenities, isLoading, error } = useQuery<Amenity[]>({
    queryKey: ['amenities'],
    queryFn: amenitiesApi.getAmenities,
  });

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Amenities</h3>
        <div className="space-y-3">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !amenities) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Amenities</h3>
        <p className="text-gray-500 text-sm">Unable to load amenities</p>
      </div>
    );
  }

  if (amenities.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Amenities</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto ">
        {amenities.map((amenity) => (
          <label 
            key={amenity.id}
            className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors group"
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity.name)}
              onChange={() => toggleAmenity(amenity.name)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <span className="text-gray-700 text-sm font-medium block">
                {amenity.name}
              </span>
              <span className="text-gray-500 text-xs block mt-0.5 line-clamp-2">
                {amenity.description}
              </span>
            </div>
          </label>
        ))}
      </div>
      
      {selectedAmenities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-600 font-medium">Filter Mode:</p>
          </div>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setFilterMode('any')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                filterMode === 'any'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              Any Match
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                filterMode === 'all'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              All Match
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {filterMode === 'any' 
              ? 'Hotels with at least one selected amenity' 
              : 'Hotels with all selected amenities'
            }
          </p>
          <p className="text-xs text-gray-600">
            {selectedAmenities.length} filter{selectedAmenities.length !== 1 ? 's' : ''} applied
          </p>
        </div>
      )}
    </div>
  );
}