import api from '@/core/api/axios';
import type { Hotel, HotelFilters, CreateHotelDto, UpdateHotelDto } from '../types';

/**
 * Hotels API Service
 * Handles all HTTP requests related to hotel management
 */
export const hotelsApi = {
  /**
   * Get all hotels with optional filters
   * @param filters - Optional filters (searchQuery, cityId, etc.)
   * @returns Promise<Hotel[]>
   */
  getHotels: async (filters?: HotelFilters): Promise<Hotel[]> => {
    const { data } = await api.get('/hotels', { 
      params: { 
        searchQuery: filters?.searchQuery || '',
        pageNumber: 1,
        pageSize: 1000, // Fetch all hotels at once
      } 
    });
    return data;
  },

  /**
   * Get a single hotel by ID
   * @param id - Hotel ID
   * @returns Promise<Hotel>
   */
  getHotelById: async (id: number): Promise<Hotel> => {
    const { data } = await api.get(`/hotels/${id}`);
    return data;
  },

  /**
   * Create a new hotel
   * @param hotelData - Hotel creation data
   * @returns Promise<Hotel>
   */
  createHotel: async (hotelData: CreateHotelDto): Promise<Hotel> => {
    const { data } = await api.post('/hotels', hotelData);
    return data;
  },

  /**
   * Update an existing hotel
   * @param hotelId - Hotel ID to update
   * @param hotelData - Hotel update data
   * @returns Promise<Hotel>
   */
  updateHotel: async (hotelId: number, hotelData: UpdateHotelDto): Promise<Hotel> => {
    const { data } = await api.put(`/hotels/${hotelId}`, hotelData);
    return data;
  },

  /**
   * Delete a hotel
   * @param hotelId - Hotel ID to delete
   * @returns Promise<void>
   */
  deleteHotel: async (hotelId: number): Promise<void> => {
    await api.delete(`/hotels/${hotelId}`);
  },
};
