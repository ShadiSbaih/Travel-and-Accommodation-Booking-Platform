import api from '@/core/api/axios';
import type { Hotel, HotelFilters, HotelGallery, HotelReview, AvailableRoom } from '../types/hotel.types';

export const hotelsApi = {
  // Get hotels with filters (supports searchQuery, pageNumber, pageSize)
  getHotels: async (filters?: HotelFilters & { searchQuery?: string; pageNumber?: number; pageSize?: number }): Promise<Hotel[]> => {
    const { data } = await api.get('/hotels', { params: filters });
    return data;
  },

  // Get hotel by ID
  getHotelById: async (id: number): Promise<Hotel> => {
    const { data } = await api.get(`/hotels/${id}`);
    return data;
  },

  // Get hotel gallery
  getHotelGallery: async (id: number): Promise<HotelGallery[]> => {
    const { data } = await api.get(`/hotels/${id}/gallery`);
    return data;
  },

  // Get available rooms for a hotel
  getAvailableRooms: async (id: number): Promise<AvailableRoom[]> => {
    const { data } = await api.get(`/hotels/${id}/available-rooms`);
    return data;
  },

  // Get hotel reviews
  getHotelReviews: async (id: number): Promise<HotelReview[]> => {
    const { data } = await api.get(`/hotels/${id}/reviews`);
    return data;
  },

  // Admin: Create hotel
  createHotel: async (hotelData: Omit<Hotel, 'id'>): Promise<Hotel[]> => {
    const { data } = await api.post('/hotels', hotelData);
    return data;
  },

  // Admin: Update hotel
  updateHotel: async (id: number, hotelData: Partial<Hotel>): Promise<Hotel[]> => {
    const { data } = await api.put(`/hotels/${id}`, hotelData);
    return data;
  },

  // Admin: Delete hotel
  deleteHotel: async (id: number): Promise<Hotel[]> => {
    const { data } = await api.delete(`/hotels/${id}`);
    return data;
  },
};