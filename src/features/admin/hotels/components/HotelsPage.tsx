import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import { useHotels } from '../hooks/useHotels';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import AdminPageHeader from '@/features/admin/shared/components/AdminPageHeader';
import HotelDialog from './HotelDialog';
import HotelErrorState from './HotelErrorState';
import HotelsSearchBar from './HotelsSearchBar';
import HotelsContent from './HotelsContent';
import EmptyHotelsState from './EmptyHotelsState';
import type { Hotel } from '../types';
import type { ViewMode } from '../types/component.types';

const ITEMS_PER_PAGE = 12;

function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { hotels = [], isLoading, error, refetch } = useHotels({
    searchQuery: debouncedSearchQuery,
  });

  // Remove duplicate hotels by ID (defensive programming)
  const uniqueHotels = hotels.reduce((acc: Hotel[], hotel) => {
    if (!acc.find(h => h.id === hotel.id)) {
      acc.push(hotel);
    }
    return acc;
  }, []);

  const displayedHotels = uniqueHotels.slice(0, displayCount);
  const hasMore = displayCount < uniqueHotels.length;

  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  }, []);

  useInfiniteScroll({
    ref: loadMoreRef,
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  // Reset display count when search changes
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [debouncedSearchQuery]);

  const handleOpenDialog = (hotel?: Hotel) => {
    setSelectedHotel(hotel || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedHotel(null);
    setIsDialogOpen(false);
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleReset = useCallback(() => {
    setSearchQuery('');
  }, []);

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
            onViewModeChange={setViewMode}
            onAdd={() => handleOpenDialog()}
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
            onEdit={handleOpenDialog}
          />
        ) : uniqueHotels.length > 0 ? (
          <HotelsContent
            hotels={displayedHotels}
            viewMode={viewMode}
            isLoading={false}
            hasMore={hasMore}
            loadMoreRef={loadMoreRef}
            onEdit={handleOpenDialog}
          />
        ) : (
          <EmptyHotelsState
            hasSearchQuery={!!searchQuery}
            onAddHotel={() => handleOpenDialog()}
          />
        )}
      </Box>

      <HotelDialog open={isDialogOpen} onClose={handleCloseDialog} hotel={selectedHotel} />
    </Box>
  );
}

export default HotelsPage;
