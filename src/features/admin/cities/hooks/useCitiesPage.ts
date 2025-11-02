import { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import {
  setCitiesViewMode,
  openCityDialog,
  closeCityDialog,
  setCitiesSearchQuery,
  incrementCitiesDisplayCount,
  resetCitiesDisplayCount,
} from '@/core/store/slices/adminUiSlice';
import { useCities } from './useCities';
import { filterCitiesByQuery } from '../utils/city.utils';
import { SEARCH_DEBOUNCE_DELAY, INFINITE_SCROLL_DELAY } from '../constants';
import type { AdminViewMode } from '@/features/admin/shared/types';

/**
 * Custom hook for Cities Page logic
 */
export const useCitiesPage = () => {
  const dispatch = useAppDispatch();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Redux state
  const { searchQuery, viewMode, isDialogOpen, selectedCity, displayCount } =
    useAppSelector((state) => state.adminUi.cities);

  // Debounced search
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_DELAY);

  // Fetch cities
  const { cities = [], isLoading, error, refetch } = useCities();

  // Filtered cities by search
  const filteredCities = useMemo(
    () => filterCitiesByQuery(cities, debouncedSearchQuery),
    [cities, debouncedSearchQuery]
  );

  // Displayed cities with pagination
  const displayedCities = useMemo(
    () => filteredCities.slice(0, displayCount),
    [filteredCities, displayCount]
  );

  const hasMore = displayCount < filteredCities.length;

  // Infinite scroll handler
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      dispatch(incrementCitiesDisplayCount());
      setIsLoadingMore(false);
    }, INFINITE_SCROLL_DELAY);
  }, [dispatch]);

  // Setup infinite scroll
  useInfiniteScroll({
    ref: loadMoreRef,
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: handleLoadMore,
  });

  // Reset display count when search changes
  useEffect(() => {
    dispatch(resetCitiesDisplayCount());
  }, [debouncedSearchQuery, dispatch]);

  // Event handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setCitiesSearchQuery(value));
    },
    [dispatch]
  );

  const handleSearchReset = useCallback(() => {
    dispatch(setCitiesSearchQuery(''));
  }, [dispatch]);

  const handleOpenDialog = useCallback(() => {
    dispatch(openCityDialog(null));
  }, [dispatch]);

  const handleCloseDialog = useCallback(() => {
    dispatch(closeCityDialog());
  }, [dispatch]);

  const handleViewModeChange = useCallback(
    (mode: AdminViewMode) => {
      dispatch(setCitiesViewMode(mode));
    },
    [dispatch]
  );

  return {
    // State
    searchQuery,
    viewMode,
    isDialogOpen,
    selectedCity,
    filteredCities,
    displayedCities,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMoreRef,

    // Handlers
    handleSearchChange,
    handleSearchReset,
    handleOpenDialog,
    handleCloseDialog,
    handleViewModeChange,
    refetch,
  };
};
