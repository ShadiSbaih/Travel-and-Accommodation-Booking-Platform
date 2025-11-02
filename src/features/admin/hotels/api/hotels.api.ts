import api from '@/core/api/axios';
import type { Hotel, HotelFilters, CreateHotelDto, UpdateHotelDto } from '../types';

export const hotelsApi = {
  // GET /hotels - Get all hotels with optional filters
  getHotels: async (filters?: HotelFilters): Promise<Hotel[]> => {
    const { data } = await api.get('/hotels', { params: filters });
    return data;
  },

  // Get hotel by ID
  getHotelById: async (id: number): Promise<Hotel> => {
    const { data } = await api.get(`/hotels/${id}`);
    return data;
  },

  // POST /hotels - Create new hotel
  createHotel: async (hotelData: CreateHotelDto): Promise<Hotel> => {
    const { data } = await api.post('/hotels', hotelData);
    return data;
  },

  // PUT /hotels/{hotelId} - Update hotel
  updateHotel: async (hotelId: number, hotelData: UpdateHotelDto): Promise<Hotel> => {
    const { data } = await api.put(`/hotels/${hotelId}`, hotelData);
    return data;
  },

  // Delete hotel (DELETE /hotels/{hotelId})
  deleteHotel: async (hotelId: number): Promise<void> => {
    await api.delete(`/hotels/${hotelId}`);
  },
};
