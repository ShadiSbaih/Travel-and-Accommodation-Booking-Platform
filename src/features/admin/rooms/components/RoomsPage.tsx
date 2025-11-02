import { useMemo, useCallback, useRef } from 'react';
import { Box, Paper } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useRooms } from '../hooks/useRooms';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import {
  setRoomsViewMode,
  openRoomDialog,
  closeRoomDialog,
  setRoomsSearchQuery,
  incrementRoomsDisplayCount,
} from '@/core/store/slices/adminUiSlice';
import AdminPageHeader from '@/features/admin/shared/components/AdminPageHeader';
import RoomsSearchBar from './RoomsSearchBar';
import RoomsContent from './RoomsContent';
import RoomDialog from './RoomDialog';
import EmptyRoomsState from './EmptyRoomsState';
import RoomErrorState from './RoomErrorState';

function RoomsPage() {
  const dispatch = useAppDispatch();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Get state from Redux
  const { searchQuery, viewMode, isDialogOpen, selectedRoom, displayCount } =
    useAppSelector((state) => state.adminUi.rooms);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { rooms = [], isLoading, error, refetch } = useRooms(
    debouncedSearchQuery ? { searchQuery: debouncedSearchQuery } : undefined
  );

  // Remove duplicate rooms by ID (defensive programming)
  const uniqueRooms = useMemo(() => {
    const unique = rooms.reduce((acc: typeof rooms, room) => {
      if (!acc.find((r) => r.roomId === room.roomId)) {
        acc.push(room);
      }
      return acc;
    }, []);
    return unique;
  }, [rooms]);

  const displayedRooms = useMemo(() => {
    const displayed = uniqueRooms.slice(0, displayCount);
    return displayed;
  }, [uniqueRooms, displayCount]);

  const hasMore = displayCount < uniqueRooms.length;

  const handleLoadMore = useCallback(() => {
    dispatch(incrementRoomsDisplayCount());
  }, [dispatch]);

  useInfiniteScroll({
    ref: loadMoreRef,
    hasMore,
    isLoading,
    onLoadMore: handleLoadMore,
  });

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setRoomsSearchQuery(value));
  }, [dispatch]);

  const handleSearchReset = useCallback(() => {
    dispatch(setRoomsSearchQuery(''));
  }, [dispatch]);

  const handleCreateRoom = useCallback(() => {
    dispatch(openRoomDialog(null));
  }, [dispatch]);

  const handleCloseDialog = useCallback(() => {
    dispatch(closeRoomDialog());
  }, [dispatch]);

  const handleSuccess = useCallback(() => {
    refetch();
    handleCloseDialog();
  }, [refetch, handleCloseDialog]);

  const handleViewModeChange = useCallback((mode: typeof viewMode) => {
    dispatch(setRoomsViewMode(mode));
  }, [dispatch]);

  // Error state
  if (error && rooms.length === 0) {
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
            title="Rooms Management"
            count={uniqueRooms.length}
            singularLabel="room"
            pluralLabel="rooms"
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onAdd={handleCreateRoom}
            addButtonLabel="Add Room"
            icon={MeetingRoomIcon}
          />
        </Paper>
        <RoomErrorState onRetry={refetch} error={error} />
      </Box>
    );
  }

  // Empty state - show when no rooms exist and not loading
  if (!isLoading && rooms.length === 0 && !debouncedSearchQuery) {
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
            title="Rooms Management"
            count={uniqueRooms.length}
            singularLabel="room"
            pluralLabel="rooms"
            hasSearchQuery={!!searchQuery}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onAdd={handleCreateRoom}
            addButtonLabel="Add Room"
            icon={MeetingRoomIcon}
          />
        </Paper>
        <EmptyRoomsState onCreateRoom={handleCreateRoom} />
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
          title="Rooms Management"
          count={uniqueRooms.length}
          singularLabel="room"
          pluralLabel="rooms"
          hasSearchQuery={!!searchQuery}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onAdd={handleCreateRoom}
          addButtonLabel="Add Room"
          icon={MeetingRoomIcon}
        />
        <RoomsSearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onReset={handleSearchReset}
        />

        <RoomsContent
          rooms={displayedRooms}
          isLoading={isLoading}
          hasMore={hasMore}
          viewMode={viewMode}
          loadMoreRef={loadMoreRef}
        />
      </Paper>

      <RoomDialog
        open={isDialogOpen}
        room={selectedRoom}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />
    </Box>
  );
}

export default RoomsPage;
