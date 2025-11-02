import { Box, CircularProgress, Typography } from '@mui/material';
import HotelCard from './HotelCard';
import HotelListView from './HotelListView';
import HotelCardSkeleton from './HotelCardSkeleton';
import HotelListSkeleton from './HotelListSkeleton';
import type { HotelsContentProps } from '../types/component.types';

function HotelsContent({
  hotels,
  viewMode,
  isLoading,
  hasMore,
  loadMoreRef,
  onEdit,
}: HotelsContentProps) {
  if (isLoading) {
    return viewMode === 'grid' ? (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <HotelCardSkeleton key={index} />
        ))}
      </Box>
    ) : (
      <HotelListSkeleton />
    );
  }

  return (
    <Box>
      {viewMode === 'grid' ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} onEdit={onEdit} />
          ))}
        </Box>
      ) : (
        <HotelListView hotels={hotels} onEdit={onEdit} />
      )}

      {/* Load More Trigger */}
      {hasMore && (
        <Box
          ref={loadMoreRef}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4,
            mt: 3,
          }}
        >
          <CircularProgress
            size={32}
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              ml: 2,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            }}
          >
            Loading more hotels...
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default HotelsContent;
