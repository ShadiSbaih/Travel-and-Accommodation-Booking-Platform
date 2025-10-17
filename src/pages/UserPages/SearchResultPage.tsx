import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from '@/components/Navbar';
import SearchBar from '@/components/features/SearchBar';
import SearchParametersDisplay from '@/components/features/SearchParametersDisplay';
import SearchResultsSection from '@/components/features/SearchResultsSection';
import AmenitiesFilter from '@/components/features/AmenitiesFilter';
import FilterStatistics from '../../components/features/FilterStatistics';
import searchApi from '@/services/api/search.api';
import type { SearchResultDTO } from '@/types/api/hotel.types';


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

        <FilterStatistics
          selectedAmenities={selectedAmenities}
          filteredCount={filteredHotels.length}
          totalCount={rawHotels?.length || 0}
          filterMode={filterMode}
          hasActiveFilters={selectedAmenities.length > 0}
        />

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
