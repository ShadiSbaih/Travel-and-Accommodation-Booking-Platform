import { useState, useMemo, useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import { useCities } from '../hooks/useCities';
import { useDebounce } from '@/shared/hooks/useDebounce';
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Debounce search query for smoother UX
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch all cities without filters (backend returns all)
  const { cities: allCities, isLoading, error, refetch } = useCities();

  // Local search filtering
  const filteredCities = useMemo(() => {
    if (!allCities) return [];
    
    if (!debouncedSearchQuery.trim()) return allCities;

    const query = debouncedSearchQuery.toLowerCase().trim();
    return allCities.filter((city) =>
      city.name.toLowerCase().includes(query)
    );
  }, [allCities, debouncedSearchQuery]);

  // Paginated cities for display
  const displayedCities = useMemo(() => {
    return filteredCities.slice(0, displayCount);
  }, [filteredCities, displayCount]);

  const hasMore = displayCount < filteredCities.length;

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  // Reset display count when search query changes
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [debouncedSearchQuery]);

  const handleOpenDialog = (city?: City) => {
    setSelectedCity(city || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCity(null);
    setDialogOpen(false);
  };

  const handleReset = () => {
    setSearchQuery('');
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0c4a6e 0%, #164e63 100%)'
            : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
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
          <CityErrorState onRetry={handleRetry} />
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

      <CityDialog open={dialogOpen} onClose={handleCloseDialog} city={selectedCity} />
    </Box>
  );
}

export default CitiesPage;
