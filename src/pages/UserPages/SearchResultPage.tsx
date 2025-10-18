import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from '../../components/Navbar';
import SearchBar from '../../components/features/SearchBar';
import SearchResultsSection from '../../components/features/SearchResultsSection';
import AmenitiesFilter from '../../components/features/AmenitiesFilter';
import FilterStatistics from '../../components/features/FilterStatistics';
import { AmenitiesFilterProvider, useAmenitiesFilter } from '../../context/AmenitiesFilter';
import searchApi from '../../services/api/search.api';
import type { SearchResultDTO } from '../../types/api/hotel.types';
import { Typography } from '@mui/material';

// Inner component that uses the context
const SearchResultsContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const adults = Number(searchParams.get('adults')) || 2;
  const children = Number(searchParams.get('children')) || 0;
  const rooms = Number(searchParams.get('rooms')) || 1;

  const { selectedAmenities, filterMode } = useAmenitiesFilter();

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

// 🧭 Main Search Results Page with Context Provider
const SearchResultPage: React.FC = () => {
  return (
    <AmenitiesFilterProvider>
      <SearchResultsContent />
    </AmenitiesFilterProvider>
  );
};

export default SearchResultPage;
