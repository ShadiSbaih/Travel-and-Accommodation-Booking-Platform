import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from '../../components/Navbar';
import SearchBar from '../../components/features/SearchBar';
import SearchResultsSection from '../../components/features/SearchResultsSection';
import AmenitiesFilter from '../../components/features/AmenitiesFilter';
import FilterStatistics from '../../components/features/FilterStatistics';
import { useAppSelector } from '../../app/hooks';
import searchApi from '../../services/api/search.api';
import type { SearchResultDTO } from '../../types/api/hotel.types';
import { Typography } from '@mui/material';

// Main Search Results Page component using Redux
const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;
  const rooms = Number(searchParams.get('rooms')) || 1;

  // Get filter state from Redux store
  const { selectedAmenities, filterMode } = useAppSelector((state) => state.filters);

  const { data: rawHotels, isLoading, error } = useQuery<SearchResultDTO[]>({
    queryKey: ['searchResults', query, adults, children, rooms],
    queryFn: () =>
      searchApi.searchHotels({ city: query, adults, children, numberOfRooms: rooms }),
    enabled: !!query,
  });

  // Memoized filtering logic based on Redux state
  const filteredHotels = useMemo(() => {
    if (!rawHotels?.length) return [];
    if (!selectedAmenities.length) return rawHotels;

    return rawHotels.filter((hotel) => {
      const names = hotel.amenities?.map((a) => a.name?.toLowerCase().trim()) || [];
      
      // 'any' mode: hotel must have at least one of the selected amenities
      if (filterMode === 'any') {
        return selectedAmenities.some((a) =>
          names.some((n) => n?.includes(a.toLowerCase()))
        );
      }
      
      // 'all' mode: hotel must have all of the selected amenities
      return selectedAmenities.every((a) =>
        names.some((n) => n?.includes(a.toLowerCase()))
      );
    });
  }, [rawHotels, selectedAmenities, filterMode]);

  return (
    <>
      <Navbar />
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          my: 2,
          textAlign: 'center',
          letterSpacing: '-0.02em'
        }}
      >
        Discover Your Perfect Stay
      </Typography>
      <SearchBar />

      <div className="container mx-auto px-4 py-6">


        <FilterStatistics
          filteredCount={filteredHotels.length}
          totalCount={rawHotels?.length || 0}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-6">
              <AmenitiesFilter />
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
};

export default SearchResultPage;
