import api from '@/core/api/axios';
import type { Room, RoomFilters, CreateRoomDto, UpdateRoomDto } from '../types';

/**
 * Rooms API Service
 * Handles all HTTP requests related to room management
 */
export const roomsApi = {
  /**
   * Get all rooms with optional filters
   * Note: Uses /hotels/1/rooms endpoint as backend returns all rooms regardless of hotel ID
   * @param filters - Optional filters (searchQuery, roomType, etc.)
   * @returns Promise<Room[]>
   */
  getRooms: async (filters?: RoomFilters): Promise<Room[]> => {
    
    // Use hotels/1/rooms endpoint (backend returns all rooms regardless of hotel ID)
    const { data } = await api.get('/hotels/1/rooms', { params: filters });

    // Apply client-side search filtering if searchQuery provided
    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const filtered = data.filter((room: Room) =>
        room.roomType.toLowerCase().includes(query) ||
        String(room.roomNumber).includes(query)
      );
      return filtered;
    }

    return data;
  },

  /**
   * Get a single room by ID
   * @param id - Room ID
   * @returns Promise<Room>
   */
  getRoomById: async (id: number): Promise<Room> => {
    const { data } = await api.get(`/rooms/${id}`);
    return data;
  },

  /**
   * Create a new room
   * Note: Backend returns the entire array after creation
   * @param roomData - Room creation data
   * @returns Promise<Room[]>
   */
  createRoom: async (roomData: CreateRoomDto): Promise<Room[]> => {
    const { data } = await api.post('/rooms', roomData);
    return data;
  },

  /**
   * Update an existing room
   * Note: Backend returns the entire array after update
   * @param id - Room ID to update
   * @param roomData - Room update data
   * @returns Promise<Room[]>
   */
  updateRoom: async (id: number, roomData: UpdateRoomDto): Promise<Room[]> => {
    const { data } = await api.put(`/rooms/${id}`, roomData);
    return data;
  },

  /**
   * Delete a room
   * Note: Backend returns the entire array after deletion
   * @param id - Room ID to delete
   * @returns Promise<Room[]>
   */
  deleteRoom: async (id: number): Promise<Room[]> => {
    const { data } = await api.delete(`/rooms/${id}`);
    return data;
  },
};
