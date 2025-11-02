import { Box, CircularProgress } from '@mui/material';
import LoadingState from '@/shared/components/LoadingState';
import RoomGridView from './RoomGridView';
import RoomListView from './RoomListView';
import type { Room } from '../types';
import type { AdminViewMode } from '@/features/admin/shared/types';

interface RoomsContentProps {
  rooms: Room[];
  isLoading: boolean;
  hasMore: boolean;
  viewMode: AdminViewMode;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}

function RoomsContent({
  rooms,
  isLoading,
  hasMore,
  viewMode,
  loadMoreRef,
}: RoomsContentProps) {
  if (isLoading && rooms.length === 0) {
    return <LoadingState message="Loading rooms..." />;
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
          {isLoading && <CircularProgress />}
        </Box>
      )}
    </Box>
  );
}

export default RoomsContent;
