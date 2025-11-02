import { Box } from '@mui/material';
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
}: Omit<HotelsContentProps, 'onEdit'>) {
  
  if (isLoading && hotels.length === 0) {
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
          mt: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <HotelCardSkeleton key={index} />
        ))}
      </Box>
    ) : (
      <Box sx={{ mt: 3 }}>
        <HotelListSkeleton />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
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
          {hotels.map((hotel, index) => (
            <HotelCard 
              key={`hotel-${hotel.id}-${index}`} 
              hotel={hotel} 
            />
          ))}
        </Box>
      ) : (
        <HotelListView hotels={hotels} />
      )}

      {/* Infinite scroll trigger */}
      {hasMore && (
        <Box ref={loadMoreRef} sx={{ py: 2, mt: 3 }}>
          {isLoading && viewMode === 'grid' ? (
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
              {Array.from({ length: 3 }).map((_, index) => (
                <HotelCardSkeleton key={`skeleton-${index}`} />
              ))}
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  );
}

export default HotelsContent;
