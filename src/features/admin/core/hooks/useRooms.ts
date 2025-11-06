import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roomsApi } from '../api';
import { useNotification } from '@/shared/hooks/useNotification';
import { QUERY_KEYS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import type { RoomFilters, CreateRoomDto, UpdateRoomDto } from '../types';

/**
 * Hook for managing rooms
 * Provides CRUD operations for rooms with React Query
 */
export const useRooms = (filters?: RoomFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all rooms
  const { data: rooms, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.ROOMS, filters],
    queryFn: () => {
      return roomsApi.getRooms(filters);
    },
  });

  // Create room mutation
  const createRoomMutation = useMutation({
    mutationFn: (roomData: CreateRoomDto) => {
      return roomsApi.createRoom(roomData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS] });
      notify(SUCCESS_MESSAGES.ROOM_CREATED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.ROOM_CREATE_FAILED, 'error');
    },
  });

  // Update room mutation
  const updateRoomMutation = useMutation({
    mutationFn: ({ roomId, data }: { roomId: number; data: UpdateRoomDto }) => {
      return roomsApi.updateRoom(roomId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM] });
      notify(SUCCESS_MESSAGES.ROOM_UPDATED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.ROOM_UPDATE_FAILED, 'error');
    },
  });

  // Delete room mutation
  const deleteRoomMutation = useMutation({
    mutationFn: (roomId: number) => {
      return roomsApi.deleteRoom(roomId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOMS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROOM] });
      notify(SUCCESS_MESSAGES.ROOM_DELETED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.ROOM_DELETE_FAILED, 'error');
    },
  });

  return {
    rooms,
    isLoading,
    error,
    refetch,
    createRoom: createRoomMutation.mutate,
    updateRoom: updateRoomMutation.mutate,
    deleteRoom: deleteRoomMutation.mutate,
    isCreating: createRoomMutation.isPending,
    isUpdating: updateRoomMutation.isPending,
    isDeleting: deleteRoomMutation.isPending,
  };
};

/**
 * Hook for fetching a single room
 * @param roomId - Room ID
 */
export const useRoom = (roomId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ROOM, roomId],
    queryFn: () => {
      return roomsApi.getRoomById(roomId);
    },
    enabled: !!roomId,
  });
};
