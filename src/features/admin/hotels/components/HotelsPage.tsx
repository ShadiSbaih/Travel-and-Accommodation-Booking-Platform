import { useState, useEffect, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import { useHotels } from '../hooks/useHotels';
import { useDebounce } from '@/shared/hooks/useDebounce';
import HotelDialog from './HotelDialog';
import HotelErrorState from './HotelErrorState';
import HotelsPageHeader from './HotelsPageHeader';
import HotelsSearchBar from './HotelsSearchBar';
import HotelsContent from './HotelsContent';
import EmptyHotelsState from './EmptyHotelsState';
import type { Hotel } from '../types';
import type { ViewMode } from '../types/component.types';

const ITEMS_PER_PAGE = 12;

function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 600);
  const { hotels = [], isLoading, error, refetch } = useHotels({
    searchQuery: debouncedSearchQuery,
  });

  const displayedHotels = hotels.slice(0, displayCount);
  const hasMore = displayCount < hotels.length;

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

  // Reset display count when search changes
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [debouncedSearchQuery]);

  const handleOpenDialog = (hotel?: Hotel) => {
    setSelectedHotel(hotel || null);
  };

  const handleCloseDialog = () => {
    setSelectedHotel(null);
  };

  const handleReset = () => {
    setSearchQuery('');
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
          <HotelsPageHeader
            hotelsCount={hotels.length}
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onAddHotel={() => handleOpenDialog()}
          />
          <HotelsSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
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
        ) : hotels.length > 0 ? (
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

      <HotelDialog open={!!selectedHotel} onClose={handleCloseDialog} hotel={selectedHotel} />
    </Box>
  );
}

export default HotelsPage;
