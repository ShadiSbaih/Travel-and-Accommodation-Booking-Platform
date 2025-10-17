import Navbar from '@/components/Navbar';
import SearchBar from '@/components/features/SearchBar';
import AmenitiesFilter from '@/components/features/AmenitiesFilter';
import SearchParametersDisplay from '@/components/features/SearchParametersDisplay';
import SearchResultsSection from '@/components/features/SearchResultsSection';
import { FilterProvider } from '@/context/Filter';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import searchApi from '@/services/api/search.api';
import type { SearchResultDTO } from '@/types/api/hotel.types';
import { useFilterAmenities } from '@/context/Filter';
import { useMemo } from 'react';
function SearchResultPageContent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");

  // Use Context API for filtering
  const { filterHotels, hasActiveFilters } = useFilterAmenities();

  const { data: rawData, isLoading, error } = useQuery<SearchResultDTO[]>({
    queryKey: ["searchResults", query, adults, children, rooms],
    queryFn: async () => {
      const result = await searchApi.searchHotels({
        city: query,
        adults,
        children,
        numberOfRooms: rooms,
      });
      console.log('Search API Response:', result);
      console.log('Search query was:', query);
      return result;
    },
    enabled: !!query,
  });

  // Apply amenities filtering
  const filteredData = useMemo(() => {
    if (!rawData) return rawData;
    return filterHotels(rawData);
  }, [rawData, filterHotels]);

  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h1>

        <SearchParametersDisplay 
          query={query}
          adults={adults}
          children={children}
          rooms={rooms}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar with filters */}
          <div className="lg:w-80 flex-shrink-0">
            <AmenitiesFilter />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <SearchResultsSection 
              data={filteredData} 
              rawData={rawData}
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
// Main component with FilterProvider wrapper
function SearchResultPage() {
  return (
    <FilterProvider>
      <SearchResultPageContent />
    </FilterProvider>
  );
}

export default SearchResultPage;