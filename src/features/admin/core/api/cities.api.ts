import api from '@/core/api/axios';
import type { City, CityFilters, CreateCityDto, UpdateCityDto } from '../types';

/**
 * Cities API Service
 * Handles all HTTP requests related to city management
 */
export const citiesApi = {
  /**
   * Get all cities with optional filters
   * @param filters - Optional filters (name, country)
   * @returns Promise<City[]>
   */
  getCities: async (filters?: CityFilters): Promise<City[]> => {
    const { data } = await api.get('/cities', { params: filters });
    return data;
  },

  /**
   * Get a single city by ID
   * @param id - City ID
   * @returns Promise<City>
   */
  getCityById: async (id: number): Promise<City> => {
    const { data } = await api.get(`/cities/${id}`);
    return data;
  },

  /**
   * Create a new city
   * @param cityData - City creation data
   * @returns Promise<City>
   */
  createCity: async (cityData: CreateCityDto): Promise<City> => {
    const { data } = await api.post('/cities', cityData);
    return data;
  },

  /**
   * Update an existing city
   * @param cityId - City ID to update
   * @param cityData - City update data
   * @returns Promise<City>
   */
  updateCity: async (cityId: number, cityData: UpdateCityDto): Promise<City> => {
    const { data } = await api.put(`/cities/${cityId}`, cityData);
    return data;
  },

  /**
   * Delete a city
   * @param cityId - City ID to delete
   * @returns Promise<void>
   */
  deleteCity: async (cityId: number): Promise<void> => {
    await api.delete(`/cities/${cityId}`);
  },
};
