import api from '@/core/api/axios';
import type { Room, RoomFilters, CreateRoomDto, UpdateRoomDto } from '../types';

export const roomsApi = {
  // GET /hotels/:id/rooms - Get all rooms (uses hotel endpoint to avoid route conflict)
  // Backend returns all rooms regardless of hotelId
  getRooms: async (filters?: RoomFilters): Promise<Room[]> => {
    // Use hotels/1/rooms endpoint (backend returns all rooms regardless of hotel ID)
    const { data } = await api.get('/hotels/1/rooms', { params: filters });
    
    // Apply client-side search filtering if searchQuery provided
    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return data.filter((room: Room) =>
        room.roomType.toLowerCase().includes(query) ||
        String(room.roomNumber).includes(query)
      );
    }
    
    return data;
  },

  // Get room by ID
  getRoomById: async (id: number): Promise<Room> => {
    const { data } = await api.get(`/rooms/${id}`);
    return data;
  },

  // POST /rooms - Create new room
  // Backend returns the entire array, but we just need to signal success
  createRoom: async (roomData: CreateRoomDto): Promise<Room[]> => {
    const { data } = await api.post('/rooms', roomData);
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
