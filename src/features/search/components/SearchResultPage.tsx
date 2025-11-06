import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import SearchBar from './SearchBar';
import SearchResultsSection from './SearchResultsSection';
import AmenitiesFilter from '@/features/filters/components/AmenitiesFilter';
import FilterStatistics from '@/features/filters/components/FilterStatistics';
import { useAppSelector } from '@/core/store/hooks';
import { Typography, Box } from '@mui/material';
import { filterHotelsByAmenities } from '../utils/filter.utils';
import { useSearchHotels } from '../hooks';

// Main Search Results Page component using Redux
const SearchResultPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Memoize search parameters to prevent unnecessary re-renders
  const searchConfig = useMemo(() => ({
    query: searchParams.get('query') || '',
    adults: Number(searchParams.get('adults')) || 2,
    children: Number(searchParams.get('children')) || 0,
    rooms: Number(searchParams.get('rooms')) || 1,
  }), [searchParams]);

  // Get filter state from Redux store
  const { selectedAmenities, filterMode } = useAppSelector((state) => state.filters);

  const { data: rawHotels, isLoading, isFetching, error } = useSearchHotels(searchConfig);

  // Show loading state for initial load or when fetching new data
  const isLoadingResults = isLoading || isFetching;

  // Memoized filtering logic based on Redux state
  const filteredHotels = useMemo(() => {
    if (!rawHotels?.length) return [];
    return filterHotelsByAmenities(rawHotels, selectedAmenities, filterMode);
  }, [rawHotels, selectedAmenities, filterMode]);

  return (
    <>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ py: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              textAlign: 'center',
              letterSpacing: '-0.02em',
              mb: 2
            }}
          >
            {searchConfig.query 
              ? `Search Results for "${searchConfig.query}"` 
              : ' Discover Your Perfect Stay'}
          </Typography>
          <SearchBar />
        </Box>

        <Box 
          component="main" 
          sx={{ 
            maxWidth: 1600, 
            mx: 'auto', 
            px: { xs: 2, md: 3 }, 
            pb: 6 
          }}
        >
          <FilterStatistics
            filteredCount={filteredHotels.length}
            totalCount={rawHotels?.length || 0}
          />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3, mt: 3 }}>
            <Box sx={{ width: { xs: '100%', lg: 300 }, flexShrink: 0 }}>
              <Box sx={{ position: { lg: 'sticky' }, top: { lg: 24 } }}>
                <AmenitiesFilter />
              </Box>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <SearchResultsSection
                data={filteredHotels}
                rawData={rawHotels}
                isLoading={isLoadingResults}
                error={error}
                hasActiveFilters={!!selectedAmenities.length}
                hasSearchQuery={!!searchConfig.query}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SearchResultPage;
