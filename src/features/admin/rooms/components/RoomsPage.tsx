import { Box, Paper } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useRoomsPage } from '../hooks/useRoomsPage';
import { pageContainerSx, paperSx } from '../styles/page.styles';
import AdminPageHeader from '@/features/admin/shared/components/AdminPageHeader';
import RoomsSearchBar from './RoomsSearchBar';
import RoomsContent from './RoomsContent';
import RoomDialog from './RoomDialog';
import EmptyRoomsState from './EmptyRoomsState';
import RoomErrorState from './RoomErrorState';

/**
 * Rooms Management Page Component
 * Main page for managing hotel rooms in the admin panel
 */
function RoomsPage() {
  const {
    searchQuery,
    viewMode,
    isDialogOpen,
    selectedRoom,
    uniqueRooms,
    displayedRooms,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMoreRef,
    handleSearchChange,
    handleSearchReset,
    handleCreateRoom,
    handleCloseDialog,
    handleSuccess,
    handleViewModeChange,
    refetch,
  } = useRoomsPage();

  // Error state
  if (error && uniqueRooms.length === 0) {
    return (
      <Box sx={pageContainerSx}>
        <Paper elevation={0} sx={paperSx}>
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
  if (!isLoading && uniqueRooms.length === 0 && !searchQuery) {
    return (
      <Box sx={pageContainerSx}>
        <Paper elevation={0} sx={paperSx}>
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

  // Main content
  return (
    <Box sx={pageContainerSx}>
      <Paper elevation={0} sx={paperSx}>
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
          isLoadingMore={isLoadingMore}
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
