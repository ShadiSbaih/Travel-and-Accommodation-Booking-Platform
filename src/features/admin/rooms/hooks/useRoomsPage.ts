import { useMemo, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import {
  setRoomsViewMode,
  openRoomDialog,
  closeRoomDialog,
  setRoomsSearchQuery,
  incrementRoomsDisplayCount,
} from '@/core/store/slices/adminUiSlice';
import { useRooms } from './useRooms';
import { removeDuplicateRooms } from '../utils/room.utils';
import { SEARCH_DEBOUNCE_DELAY, INFINITE_SCROLL_DELAY } from '../constants';
import type { AdminViewMode } from '@/features/admin/shared/types';

/**
 * Custom hook for Rooms Page logic
 */
export const useRoomsPage = () => {
  const dispatch = useAppDispatch();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Redux state
  const { searchQuery, viewMode, isDialogOpen, selectedRoom, displayCount } =
    useAppSelector((state) => state.adminUi.rooms);

  // Debounced search
  const debouncedSearchQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_DELAY);

  // Fetch rooms
  const { rooms = [], isLoading, error, refetch } = useRooms(
    debouncedSearchQuery ? { searchQuery: debouncedSearchQuery } : undefined
  );

  // Memoized unique rooms
  const uniqueRooms = useMemo(() => removeDuplicateRooms(rooms), [rooms]);

  // Memoized displayed rooms
  const displayedRooms = useMemo(
    () => uniqueRooms.slice(0, displayCount),
    [uniqueRooms, displayCount]
  );

  const hasMore = displayCount < uniqueRooms.length;

  // Infinite scroll handler
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      dispatch(incrementRoomsDisplayCount());
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

  // Event handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(setRoomsSearchQuery(value));
    },
    [dispatch]
  );

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

  const handleViewModeChange = useCallback(
    (mode: AdminViewMode) => {
      dispatch(setRoomsViewMode(mode));
    },
    [dispatch]
  );

  return {
    // State
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

    // Handlers
    handleSearchChange,
    handleSearchReset,
    handleCreateRoom,
    handleCloseDialog,
    handleSuccess,
    handleViewModeChange,
    refetch,
  };
};
