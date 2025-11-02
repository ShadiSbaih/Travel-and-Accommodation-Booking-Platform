import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roomsApi } from '../api/rooms.api';
import type { RoomFilters, CreateRoomDto, UpdateRoomDto } from '../types';
import { useNotification } from '@/shared/hooks/useNotification';

export const useRooms = (filters?: RoomFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all rooms
  const { data: rooms, isLoading, error, refetch } = useQuery({
    queryKey: ['rooms', filters],
    queryFn: () => roomsApi.getRooms(filters),
  });

  // Create room mutation
  const createRoomMutation = useMutation({
    mutationFn: (roomData: CreateRoomDto) => roomsApi.createRoom(roomData),
    onSuccess: () => {
      // Invalidate all room queries to force refetch from server
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      notify('Room created successfully', 'success');
    },
    onError: () => {
      notify('Failed to create room', 'error');
    },
  });

  // Update room mutation
  const updateRoomMutation = useMutation({
    mutationFn: ({ roomId, data }: { roomId: number; data: UpdateRoomDto }) =>
      roomsApi.updateRoom(roomId, data),
    onSuccess: () => {
      // Invalidate all room queries to force refetch from server
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room'] });
      notify('Room updated successfully', 'success');
    },
    onError: () => {
      notify('Failed to update room', 'error');
    },
  });

  // Delete room mutation
  const deleteRoomMutation = useMutation({
    mutationFn: (roomId: number) => roomsApi.deleteRoom(roomId),
    onSuccess: () => {
      // Invalidate all room queries to force refetch from server
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room'] });
      notify('Room deleted successfully', 'success');
    },
    onError: () => {
      notify('Failed to delete room', 'error');
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

export const useRoom = (roomId: number) => {
  return useQuery({
    queryKey: ['room', roomId],
    queryFn: () => roomsApi.getRoomById(roomId),
    enabled: !!roomId,
  });
};
