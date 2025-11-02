import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import { useCities } from '../hooks/useCities';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import CityDialog from './CityDialog';
import CityErrorState from './CityErrorState';
import CitiesPageHeader from './CitiesPageHeader';
import CitiesSearchBar from './CitiesSearchBar';
import CitiesContent from './CitiesContent';
import EmptyCitiesState from './EmptyCitiesState';
import type { City } from '../types';
import type { ViewMode } from '../types/component.types';

const ITEMS_PER_PAGE = 12;

function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { cities = [], isLoading, error, refetch } = useCities();

  // Local search filtering
  const filteredCities = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return cities;

    const query = debouncedSearchQuery.toLowerCase().trim();
    return cities.filter((city) =>
      city.name.toLowerCase().includes(query)
    );
  }, [cities, debouncedSearchQuery]);

  // Paginated cities for display
  const displayedCities = useMemo(() => {
    return filteredCities.slice(0, displayCount);
  }, [filteredCities, displayCount]);

  const hasMore = displayCount < filteredCities.length;

  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  useInfiniteScroll({
    ref: loadMoreRef,
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  // Reset display count when search query changes
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [debouncedSearchQuery]);

  const handleOpenDialog = (city?: City) => {
    setSelectedCity(city || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCity(null);
    setIsDialogOpen(false);
  };

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
    
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Paper
          elevation={0}
          sx={{
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            mb: 3,
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.1)' : 'none',
          }}
        >
          <CitiesPageHeader
            citiesCount={filteredCities?.length || 0}
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onAddCity={() => handleOpenDialog()}
          />
          <CitiesSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onReset={handleReset}
          />
        </Paper>

        {error ? (
          <CityErrorState onRetry={refetch} />
        ) : isLoading ? (
          <CitiesContent
            cities={[]}
            viewMode={viewMode}
            isLoading={true}
            hasMore={false}
            loadMoreRef={loadMoreRef}
            onEdit={handleOpenDialog}
          />
        ) : filteredCities && filteredCities.length > 0 ? (
          <CitiesContent
            cities={displayedCities}
            viewMode={viewMode}
            isLoading={false}
            hasMore={hasMore}
            loadMoreRef={loadMoreRef}
            onEdit={handleOpenDialog}
          />
        ) : (
          <EmptyCitiesState
            hasSearchQuery={!!searchQuery}
            onAddCity={() => handleOpenDialog()}
          />
        )}
      </Box>

      <CityDialog open={isDialogOpen} onClose={handleCloseDialog} city={selectedCity} />
    </Box>
  );
}

export default CitiesPage;
