import api from '@/core/api/axios';
import type { Room, RoomFilters, CreateRoomDto, UpdateRoomDto } from '../types';

export const roomsApi = {
  // GET /hotels/:id/rooms - Get all rooms (uses hotel endpoint to avoid route conflict)
  // Backend returns all rooms regardless of hotelId
  getRooms: async (filters?: RoomFilters): Promise<Room[]> => {
    console.log('🔍 [Rooms API] Fetching rooms with filters:', filters);
    // Use hotels/1/rooms endpoint (backend returns all rooms regardless of hotel ID)
    const { data } = await api.get('/hotels/1/rooms', { params: filters });
    console.log('✅ [Rooms API] Fetched rooms:', data.length, 'rooms');

    // Apply client-side search filtering if searchQuery provided
    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const filtered = data.filter((room: Room) =>
        room.roomType.toLowerCase().includes(query) ||
        String(room.roomNumber).includes(query)
      );
      console.log('🔍 [Rooms API] Filtered rooms by search query:', filtered.length, 'results');
      return filtered;
    }

    return data;
  },

  // Get room by ID
  getRoomById: async (id: number): Promise<Room> => {
    console.log('🔍 [Rooms API] Fetching room by ID:', id);
    const { data } = await api.get(`/rooms/${id}`);
    console.log('✅ [Rooms API] Fetched room:', data);
    return data;
  },

  // POST /rooms - Create new room
  // Backend returns the entire array, but we just need to signal success
  createRoom: async (roomData: CreateRoomDto): Promise<Room[]> => {
    const { data } = await api.post('/rooms', roomData);
    console.log('✅ [Rooms API] Room created successfully. Response:', data);
    return data; // Backend returns full array
  },

  // PUT /rooms/{roomId} - Update room
  // Backend returns the entire array, but we just need to signal success
  updateRoom: async (id: number, roomData: UpdateRoomDto): Promise<Room[]> => {
    const { data } = await api.put(`/rooms/${id}`, roomData);
    return data; // Backend returns full array
  },

  // DELETE /rooms/{roomId} - Delete room
  // Backend returns the entire array after deletion
  deleteRoom: async (id: number): Promise<Room[]> => {
    const { data } = await api.delete(`/rooms/${id}`);
    return data; // Backend returns full array
  },
};
