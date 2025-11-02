import api from '@/core/api/axios';
import type { Room, RoomFilters } from '../types/room.types';

export const roomsApi = {
  // Get all rooms with optional filters
  getRooms: async (filters?: RoomFilters): Promise<Room[]> => {
    const { data } = await api.get('/rooms', { params: filters });
    return data;
  },

  // Get room by ID
  getRoomById: async (id: number): Promise<Room> => {
    const { data } = await api.get(`/rooms/${id}`);
    return data;
  },

  // Create new room
  createRoom: async (roomData: Omit<Room, 'id'>): Promise<Room> => {
    const { data } = await api.post('/rooms', roomData);
    return data;
  },

  // Update room
  updateRoom: async (id: number, roomData: Partial<Room>): Promise<Room> => {
    const { data } = await api.put(`/rooms/${id}`, roomData);
    return data;
  },

  // Delete room
  deleteRoom: async (id: number): Promise<void> => {
    await api.delete(`/rooms/${id}`);
  },
};
