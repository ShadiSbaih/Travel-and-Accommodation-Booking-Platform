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

// 🏷️ Amenities Filter Component
function AmenitiesFilter({
  selectedAmenities,
  onAmenitiesChange,
  filterMode,
  onFilterModeChange,
}: {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
  filterMode: 'any' | 'all';
  onFilterModeChange: (mode: 'any' | 'all') => void;
}) {
  const { data: amenities, isLoading, error } = useQuery<Amenity[]>({
    queryKey: ['amenities'],
    queryFn: amenitiesApi.getAmenities,
  });

  const handleAmenityToggle = useCallback(
    (amenityName: string) => {
      const newAmenities = selectedAmenities.includes(amenityName)
        ? selectedAmenities.filter((a) => a !== amenityName)
        : [...selectedAmenities, amenityName];

      onAmenitiesChange(newAmenities);
      if (newAmenities.length <= 1 && filterMode === 'all')
        onFilterModeChange('any');
    },
    [selectedAmenities, onAmenitiesChange, filterMode, onFilterModeChange]
  );

  if (isLoading || error || !amenities?.length) {
    const message = isLoading
      ? 'Loading amenities...'
      : error
      ? 'Failed to load amenities'
      : 'No amenities available';

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Amenities</h3>
        <p className="text-sm text-gray-600 text-center">{message}</p>
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
              onClick={() => onAmenitiesChange([])}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All ({selectedAmenities.length})
            </button>
          )}
        </div>

        {/* 🧩 Filter Mode Switch */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Match Mode:</p>
          <div className="flex space-x-1 bg-white rounded-md p-1 border">
            {['any', 'all'].map((mode) => (
              <button
                key={mode}
                onClick={() => onFilterModeChange(mode as 'any' | 'all')}
                className={`px-3 py-1 text-sm rounded transition-all ${
                  filterMode === mode
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mode === 'any' ? 'Any Match' : 'All Match'}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {filterMode === 'any'
              ? 'Hotels with at least one selected amenity'
              : 'Hotels with all selected amenities'}
          </p>
        </div>

        {/* 🧾 Amenities List */}
        <div className="relative">
          <div
            className="max-h-80 overflow-y-auto space-y-2 pr-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f1f5f9',
            }}
          >
            {amenities.map((amenity) => (
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
                  <span className="text-sm text-gray-700">
                    {amenity.name}
                  </span>
                  {amenity.description && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {amenity.description}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>

          {amenities.length > 8 && (
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg"></div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🧭 Main Search Results Page
function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;
  const rooms = Number(searchParams.get('rooms')) || 1;

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<'any' | 'all'>('any');

  const { data: rawHotels, isLoading, error } = useQuery<SearchResultDTO[]>({
    queryKey: ['searchResults', query, adults, children, rooms],
    queryFn: () =>
      searchApi.searchHotels({ city: query, adults, children, numberOfRooms: rooms }),
    enabled: !!query,
  });

  const filteredHotels = useMemo(() => {
    if (!rawHotels?.length) return [];
    if (!selectedAmenities.length) return rawHotels;

    return rawHotels.filter((hotel) => {
      const names = hotel.amenities?.map((a) => a.name?.toLowerCase().trim()) || [];
      return filterMode === 'all'
        ? selectedAmenities.every((a) =>
            names.some((n) => n?.includes(a.toLowerCase()))
          )
        : selectedAmenities.some((a) =>
            names.some((n) => n?.includes(a.toLowerCase()))
          );
    });
  }, [rawHotels, selectedAmenities, filterMode]);

  return (
    <>
      <Navbar />
      <SearchBar />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h1>

        <SearchParametersDisplay query={query} adults={adults} children={children} rooms={rooms} />

        {selectedAmenities.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              🔍 Found <strong>{filteredHotels.length}</strong> of{' '}
              <strong>{rawHotels?.length || 0}</strong> hotels{' '}
              {selectedAmenities.length > 1
                ? `with ${filterMode} of the selected amenities`
                : 'with the selected amenity'}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedAmenities.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
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

          <div className="flex-1">
            <SearchResultsSection
              data={filteredHotels}
              rawData={rawHotels}
              isLoading={isLoading}
              error={error}
              hasActiveFilters={!!selectedAmenities.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResultPage;
