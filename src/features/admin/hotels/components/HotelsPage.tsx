import { useEffect, useRef, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import { useHotels } from '../hooks/useHotels';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import {
  setHotelsViewMode,
  openHotelDialog,
  closeHotelDialog,
  setHotelsSearchQuery,
  incrementHotelsDisplayCount,
  resetHotelsDisplayCount,
} from '@/core/store/slices/adminUiSlice';
import AdminPageHeader from '@/features/admin/shared/components/AdminPageHeader';
import HotelDialog from './HotelDialog';
import HotelErrorState from './HotelErrorState';
import HotelsSearchBar from './HotelsSearchBar';
import HotelsContent from './HotelsContent';
import EmptyHotelsState from './EmptyHotelsState';

function HotelsPage() {
  const dispatch = useAppDispatch();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Get state from Redux
  const { searchQuery, viewMode, isDialogOpen, selectedHotel, displayCount } =
    useAppSelector((state) => state.adminUi.hotels);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { hotels = [], isLoading, error, refetch } = useHotels({
    searchQuery: debouncedSearchQuery,
  });

  // Remove duplicate hotels by ID (defensive programming)
  const uniqueHotels = hotels.reduce((acc: typeof hotels, hotel) => {
    if (!acc.find(h => h.id === hotel.id)) {
      acc.push(hotel);
    }
    return acc;
  }, []);

  const displayedHotels = uniqueHotels.slice(0, displayCount);
  const hasMore = displayCount < uniqueHotels.length;

  const handleLoadMore = useCallback(() => {
    dispatch(incrementHotelsDisplayCount());
  }, [dispatch]);

  useInfiniteScroll({
    ref: loadMoreRef,
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  // Reset display count when search changes
  useEffect(() => {
    dispatch(resetHotelsDisplayCount());
  }, [debouncedSearchQuery, dispatch]);

  const handleOpenDialog = useCallback(() => {
    dispatch(openHotelDialog(null));
  }, [dispatch]);

  const handleCloseDialog = useCallback(() => {
    dispatch(closeHotelDialog());
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setHotelsSearchQuery(value));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setHotelsSearchQuery(''));
  }, [dispatch]);

  const handleViewModeChange = useCallback((mode: typeof viewMode) => {
    dispatch(setHotelsViewMode(mode));
  }, [dispatch]);

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
          <AdminPageHeader
            title="Hotels Management"
            count={uniqueHotels.length}
            singularLabel="hotel"
            pluralLabel="hotels"
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onAdd={handleOpenDialog}
            addButtonLabel="Add Hotel"
            icon={HotelIcon}
          />
          <HotelsSearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onReset={handleReset}
          />
        </Paper>

        {error ? (
          <HotelErrorState onRetry={refetch} />
        ) : isLoading ? (
          <HotelsContent
            hotels={[]}
            viewMode={viewMode}
            isLoading={true}
            hasMore={false}
            loadMoreRef={loadMoreRef}
          />
        ) : uniqueHotels.length > 0 ? (
          <HotelsContent
            hotels={displayedHotels}
            viewMode={viewMode}
            isLoading={false}
            hasMore={hasMore}
            loadMoreRef={loadMoreRef}
          />
        ) : (
          <EmptyHotelsState
            hasSearchQuery={!!searchQuery}
            onAddHotel={handleOpenDialog}
          />
        )}
      </Box>

      <HotelDialog open={isDialogOpen} onClose={handleCloseDialog} hotel={selectedHotel} />
    </Box>
  );
}

export default HotelsPage;
