import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roomsApi } from '../api/rooms.api';
import type { Room, RoomFilters } from '../types/room.types';
import { useNotification } from '@/shared/hooks/useNotification';

export const useRooms = (filters?: RoomFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all rooms
  const { data: rooms, isLoading, error } = useQuery({
    queryKey: ['rooms', filters],
    queryFn: () => roomsApi.getRooms(filters),
  });

  // Create room mutation
  const createRoomMutation = useMutation({
    mutationFn: (roomData: Omit<Room, 'id'>) => roomsApi.createRoom(roomData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      notify('Room created successfully', 'success');
    },
    onError: () => {
      notify('Failed to create room', 'error');
    },
  });

  // Update room mutation
  const updateRoomMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Room> }) =>
      roomsApi.updateRoom(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      notify('Room updated successfully', 'success');
    },
    onError: () => {
      notify('Failed to update room', 'error');
    },
  });

  // Delete room mutation
  const deleteRoomMutation = useMutation({
    mutationFn: (id: number) => roomsApi.deleteRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
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
    createRoom: createRoomMutation.mutate,
    updateRoom: updateRoomMutation.mutate,
    deleteRoom: deleteRoomMutation.mutate,
    isCreating: createRoomMutation.isPending,
    isUpdating: updateRoomMutation.isPending,
    isDeleting: deleteRoomMutation.isPending,
  };
};

export const useRoom = (id: number) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: () => roomsApi.getRoomById(id),
    enabled: !!id,
  });
};
