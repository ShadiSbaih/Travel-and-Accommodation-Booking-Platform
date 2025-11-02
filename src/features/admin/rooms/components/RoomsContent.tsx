import { Box, CircularProgress } from '@mui/material';
import RoomGridView from './RoomGridView';
import RoomListView from './RoomListView';
import RoomCardSkeleton from './RoomCardSkeleton';
import RoomListSkeleton from './RoomListSkeleton';
import type { Room } from '../types';
import type { AdminViewMode } from '@/features/admin/shared/types';

interface RoomsContentProps {
  rooms: Room[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  viewMode: AdminViewMode;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

function RoomsContent({
  rooms,
  isLoading,
  isLoadingMore,
  hasMore,
  viewMode,
  loadMoreRef,
}: RoomsContentProps) {
  if (isLoading && rooms.length === 0) {
    return viewMode === 'grid' ? (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
          mt: 3,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </Box>
    ) : (
      <Box sx={{ mt: 3 }}>
        <RoomListSkeleton />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      {viewMode === 'grid' ? (
        <RoomGridView rooms={rooms} />
      ) : (
        <RoomListView rooms={rooms} />
      )}

      {/* Infinite scroll trigger */}
      {hasMore && (
        <Box 
          ref={loadMoreRef} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            py: 4, 
            mt: 3 
          }}
        >
          {isLoadingMore && <CircularProgress />}
        </Box>
      )}
    </Box>
  );
}

export default RoomsContent;
