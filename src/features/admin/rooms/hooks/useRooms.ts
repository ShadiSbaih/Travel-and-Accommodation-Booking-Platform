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
    queryFn: () => {
      console.log('🔄 [useRooms] Fetching rooms with filters:', filters);
      return roomsApi.getRooms(filters);
    },
  });

  // Create room mutation
  const createRoomMutation = useMutation({
    mutationFn: (roomData: CreateRoomDto) => {
      console.log('➕ [useRooms] CREATE mutation started with data:', roomData);
      return roomsApi.createRoom(roomData);
    },
    onSuccess: (data) => {
      console.log('✅ [useRooms] CREATE mutation succeeded. Response:', data);
      // Invalidate all room queries to force refetch from server
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      console.log('🔄 [useRooms] Invalidated rooms queries');
      notify('Room created successfully', 'success');
    },
    onError: (error) => {
      console.error('❌ [useRooms] CREATE mutation failed:', error);
      notify('Failed to create room', 'error');
    },
  });

  // Update room mutation
  const updateRoomMutation = useMutation({
    mutationFn: ({ roomId, data }: { roomId: number; data: UpdateRoomDto }) => {
      console.log('✏️ [useRooms] UPDATE mutation started for room ID:', roomId, 'with data:', data);
      return roomsApi.updateRoom(roomId, data);
    },
    onSuccess: (data, variables) => {
      console.log('✅ [useRooms] UPDATE mutation succeeded for room ID:', variables.roomId, 'Response:', data);
      // Invalidate all room queries to force refetch from server
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room'] });
      console.log('🔄 [useRooms] Invalidated rooms and room queries');
      notify('Room updated successfully', 'success');
    },
    onError: (error, variables) => {
      console.error('❌ [useRooms] UPDATE mutation failed for room ID:', variables.roomId, 'Error:', error);
      notify('Failed to update room', 'error');
    },
  });

  // Delete room mutation
  const deleteRoomMutation = useMutation({
    mutationFn: (roomId: number) => {
      console.log('🗑️ [useRooms] DELETE mutation started for room ID:', roomId);
      return roomsApi.deleteRoom(roomId);
    },
    onSuccess: (data, roomId) => {
      console.log('✅ [useRooms] DELETE mutation succeeded for room ID:', roomId, 'Response:', data);
      // Invalidate all room queries to force refetch from server
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room'] });
      console.log('🔄 [useRooms] Invalidated rooms and room queries');
      notify('Room deleted successfully', 'success');
    },
    onError: (error, roomId) => {
      console.error('❌ [useRooms] DELETE mutation failed for room ID:', roomId, 'Error:', error);
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
    queryFn: () => {
      console.log('🔄 [useRoom] Fetching single room with ID:', roomId);
      return roomsApi.getRoomById(roomId);
    },
    enabled: !!roomId,
  });
};
