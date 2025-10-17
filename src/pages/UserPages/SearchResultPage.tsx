import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from '@/components/Navbar';
import SearchBar from '@/components/features/SearchBar';
import SearchParametersDisplay from '@/components/features/SearchParametersDisplay';
import SearchResultsSection from '@/components/features/SearchResultsSection';
import searchApi from '@/services/api/search.api';
import amenitiesApi from '@/services/api/amenities.api';
import type { SearchResultDTO } from '@/types/api/hotel.types';
import type { Amenity } from '@/types/api/amenities';

//Amenities Filter Component
function AmenitiesFilter({
  selectedAmenities,
  onAmenitiesChange,
  filterMode,
  onFilterModeChange
}: {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
  filterMode: 'any' | 'all';
  onFilterModeChange: (mode: 'any' | 'all') => void;
}) {
  // Fetch amenities from API
  const { data: amenities, isLoading: amenitiesLoading, error: amenitiesError } = useQuery<Amenity[]>({
    queryKey: ["amenities"],
    queryFn: () => amenitiesApi.getAmenities(),
  });

  const handleAmenityToggle = useCallback((amenityName: string) => {
    if (selectedAmenities.includes(amenityName)) {
      // Remove amenity
      const newAmenities = selectedAmenities.filter(a => a !== amenityName);
      onAmenitiesChange(newAmenities);
      
      // Reset to 'any' mode when no amenities remain or only one amenity (all mode doesn't make sense)
      if (newAmenities.length <= 1 && filterMode === 'all') {
        onFilterModeChange('any');
      }
    } else {
      // Add amenity  
      onAmenitiesChange([...selectedAmenities, amenityName]);
    }
  }, [selectedAmenities, onAmenitiesChange, filterMode, onFilterModeChange]);

  const clearAllFilters = useCallback(() => {
    onAmenitiesChange([]);
  }, [onAmenitiesChange]);

  // Handle loading state
  if (amenitiesLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-sm text-gray-600">Loading amenities...</span>
        </div>
      </div>
    );
  }

  // Handle error state
  if (amenitiesError) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
        <div className="text-center py-4">
          <p className="text-sm text-red-600">Failed to load amenities</p>
          <p className="text-xs text-gray-500 mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  // Handle no amenities
  if (!amenities || amenities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
        <p className="text-sm text-gray-600">No amenities available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Amenities</h3>
          {selectedAmenities.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All ({selectedAmenities.length})
            </button>
          )}
        </div>

        {/* Filter Mode Switch - Always Show */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Match Mode:</p>
        <div className="flex space-x-1 bg-white rounded-md p-1 border">
          <button
            onClick={() => onFilterModeChange('any')}
            className={`px-3 py-1 text-sm rounded transition-all ${
              filterMode === 'any'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Any Match
          </button>
          <button
            onClick={() => onFilterModeChange('all')}
            className={`px-3 py-1 text-sm rounded transition-all ${
              filterMode === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Match
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {filterMode === 'any' 
            ? 'Hotels with at least one selected amenity' 
            : 'Hotels with all selected amenities'
          }
        </p>
        </div>

        {/* Scrollable Amenities List */}
        <div className="relative">
          <div className="max-h-80 overflow-y-auto space-y-2 pr-2" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9'
          }}>
        {amenities.map(amenity => (
          <label 
            key={amenity.id} 
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            title={amenity.description || amenity.name}
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity.name)}
              onChange={() => handleAmenityToggle(amenity.name)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-700">{amenity.name}</span>
              {amenity.description && (
                <p className="text-xs text-gray-500 mt-0.5">{amenity.description}</p>
              )}
            </div>
          </label>
        ))}
          </div>
          
          {/* Scroll indicator */}
          {amenities && amenities.length > 8 && (
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg"></div>
          )}
        </div>
      </div>
    </div>
  );
}

//Main Search Results Page -  VERSION
function SearchResultPage() {
  const [searchParams] = useSearchParams();

  //  Extract search parameters from URL
  const query = searchParams.get("query") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");

  //  Filter state - very simple!
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<'any' | 'all'>('any');

  //  Fetch hotels data from API
  const { data: rawHotels, isLoading, error } = useQuery<SearchResultDTO[]>({
    queryKey: ["searchResults", query, adults, children, rooms],
    queryFn: async () => {
      const result = await searchApi.searchHotels({
        city: query,
        adults,
        children,
        numberOfRooms: rooms,
      });
      console.log('🏨 Hotels from API:', result?.length || 0);
      return result;
    },
    enabled: !!query,
  });

  //  Filter hotels - simple and clear logic!
  const filteredHotels = useMemo(() => {
    // If no hotels, return empty array
    if (!rawHotels || rawHotels.length === 0) {
      return [];
    }

    // If no filters selected, return all hotels
    if (selectedAmenities.length === 0) {
      return rawHotels;
    }

    // Filter hotels that have the required amenities
    const filtered = rawHotels.filter(hotel => {
      // Make sure hotel has amenities
      if (!hotel.amenities || !Array.isArray(hotel.amenities)) {
        return false;
      }

      // Hotel amenity names
      const hotelAmenityNames = hotel.amenities.map(amenity =>
        amenity.name?.toLowerCase().trim()
      );

      if (filterMode === 'all') {
        // ALL match: Hotel must have ALL selected amenities
        return selectedAmenities.every(selectedAmenity =>
          hotelAmenityNames.some(hotelAmenity =>
            hotelAmenity?.includes(selectedAmenity.toLowerCase())
          )
        );
      } else {
        // ANY match: Hotel must have at least ONE selected amenity
        return selectedAmenities.some(selectedAmenity =>
          hotelAmenityNames.some(hotelAmenity =>
            hotelAmenity?.includes(selectedAmenity.toLowerCase())
          )
        );
      }
    });

    console.log(`🔍 Filtered (${filterMode} match): ${rawHotels.length} → ${filtered.length} hotels`);
    return filtered;
  }, [rawHotels, selectedAmenities, filterMode]);

  //  Additional information
  const hasActiveFilters = selectedAmenities.length > 0;
  const totalHotels = rawHotels?.length || 0;
  const filteredCount = filteredHotels.length;

  return (
    <>
      <Navbar />
      <SearchBar />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h1>

        {/* Display search parameters */}
        <SearchParametersDisplay
          query={query}
          adults={adults}
          children={children}
          rooms={rooms}
        />

        {/* Display filtering statistics */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-blue-800 text-sm">
                  🔍 Found <strong>{filteredCount}</strong> hotel{filteredCount !== 1 ? 's' : ''}
                  out of <strong>{totalHotels}</strong> total hotel{totalHotels !== 1 ? 's' : ''}
                  {selectedAmenities.length > 1 && (
                    <span className="ml-1">
                      with <strong>{filterMode === 'any' ? 'any' : 'all'}</strong> of the selected amenities
                    </span>
                  )}
                  {selectedAmenities.length === 1 && (
                    <span className="ml-1">with the selected amenity</span>
                  )}
                </p>
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
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - sticky sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-6">
              <AmenitiesFilter
                selectedAmenities={selectedAmenities}
                onAmenitiesChange={setSelectedAmenities}
                filterMode={filterMode}
                onFilterModeChange={setFilterMode}
              />
            </div>
          </div>

          {/* Results - main content */}
          <div className="flex-1">
            <SearchResultsSection
              data={filteredHotels}
              rawData={rawHotels}
              isLoading={isLoading}
              error={error}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResultPage;