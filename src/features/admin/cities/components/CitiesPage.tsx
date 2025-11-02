import { useMemo, useEffect, useRef, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useCities } from '../hooks/useCities';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import {
  setCitiesViewMode,
  openCityDialog,
  closeCityDialog,
  setCitiesSearchQuery,
  incrementCitiesDisplayCount,
  resetCitiesDisplayCount,
} from '@/core/store/slices/adminUiSlice';
import AdminPageHeader from '@/features/admin/shared/components/AdminPageHeader';
import CityDialog from './CityDialog';
import CityErrorState from './CityErrorState';
import CitiesSearchBar from './CitiesSearchBar';
import CitiesContent from './CitiesContent';
import EmptyCitiesState from './EmptyCitiesState';

function CitiesPage() {
  const dispatch = useAppDispatch();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Get state from Redux
  const { searchQuery, viewMode, isDialogOpen, selectedCity, displayCount } =
    useAppSelector((state) => state.adminUi.cities);

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
    dispatch(incrementCitiesDisplayCount());
  }, [dispatch]);

  useInfiniteScroll({
    ref: loadMoreRef,
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  // Reset display count when search query changes
  useEffect(() => {
    dispatch(resetCitiesDisplayCount());
  }, [debouncedSearchQuery, dispatch]);

  const handleOpenDialog = useCallback(() => {
    dispatch(openCityDialog(null));
  }, [dispatch]);

  const handleCloseDialog = useCallback(() => {
    dispatch(closeCityDialog());
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setCitiesSearchQuery(''));
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setCitiesSearchQuery(value));
  }, [dispatch]);

  const handleViewModeChange = useCallback((mode: typeof viewMode) => {
    dispatch(setCitiesViewMode(mode));
  }, [dispatch]);

  // Error state - don't show search bar
  if (error && cities.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(148, 163, 184, 0.1)'
                : 'none',
          }}
        >
          <AdminPageHeader
            title="Cities Management"
            count={filteredCities.length}
            singularLabel="city"
            pluralLabel="cities"
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onAdd={handleOpenDialog}
            addButtonLabel="Add City"
            icon={LocationCityIcon}
          />
        </Paper>
        <CityErrorState onRetry={refetch} />
      </Box>
    );
  }

  // Empty state - show when no cities exist and not loading
  if (!isLoading && cities.length === 0 && !debouncedSearchQuery) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 2,
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(148, 163, 184, 0.1)'
                : 'none',
          }}
        >
          <AdminPageHeader
            title="Cities Management"
            count={filteredCities.length}
            singularLabel="city"
            pluralLabel="cities"
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onAdd={handleOpenDialog}
            addButtonLabel="Add City"
            icon={LocationCityIcon}
          />
        </Paper>
        <EmptyCitiesState
          hasSearchQuery={false}
          onAddCity={handleOpenDialog}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 41, 59, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 2,
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : 'none',
        }}
      >
        <AdminPageHeader
          title="Cities Management"
          count={filteredCities.length}
          singularLabel="city"
          pluralLabel="cities"
          hasSearchQuery={!!searchQuery}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onAdd={handleOpenDialog}
          addButtonLabel="Add City"
          icon={LocationCityIcon}
        />
        <CitiesSearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onReset={handleReset}
        />

        {isLoading ? (
          <CitiesContent
            cities={[]}
            viewMode={viewMode}
            isLoading={true}
            hasMore={false}
            loadMoreRef={loadMoreRef}
          />
        ) : filteredCities && filteredCities.length > 0 ? (
          <CitiesContent
            cities={displayedCities}
            viewMode={viewMode}
            isLoading={false}
            hasMore={hasMore}
            loadMoreRef={loadMoreRef}
          />
        ) : (
          <EmptyCitiesState
            hasSearchQuery={!!searchQuery}
            onAddCity={handleOpenDialog}
          />
        )}
      </Paper>

      <CityDialog open={isDialogOpen} onClose={handleCloseDialog} city={selectedCity} />
    </Box>
  );
}

export default CitiesPage;
