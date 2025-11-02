import api from '@/core/api/axios';
import type { City, CityFilters } from '../types/city.types';

export const citiesApi = {
  // Get all cities with optional filters
  getCities: async (filters?: CityFilters): Promise<City[]> => {
    const { data } = await api.get('/cities', { params: filters });
    return data;
  },

  // Get city by ID
  getCityById: async (id: number): Promise<City> => {
    const { data } = await api.get(`/cities/${id}`);
    return data;
  },

  // Create new city
  createCity: async (cityData: Omit<City, 'id'>): Promise<City> => {
    const { data } = await api.post('/cities', cityData);
    return data;
  },

  // Update city
  updateCity: async (id: number, cityData: Partial<City>): Promise<City> => {
    const { data } = await api.put(`/cities/${id}`, cityData);
    return data;
  },

  // Delete city
  deleteCity: async (id: number): Promise<void> => {
    await api.delete(`/cities/${id}`);
  },
};
