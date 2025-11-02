import api from '@/core/api/axios';
import type { City, CityFilters, CreateCityDto, UpdateCityDto } from '../types';

export const citiesApi = {
  // GET /cities - Get all cities with optional filters (name, country)
  getCities: async (filters?: CityFilters): Promise<City[]> => {
    const { data } = await api.get('/cities', { params: filters });
    return data;
  },

  // Get city by ID
  getCityById: async (id: number): Promise<City> => {
    const { data } = await api.get(`/cities/${id}`);
    return data;
  },

  // POST /cities - Create new city
  createCity: async (cityData: CreateCityDto): Promise<City> => {
    const { data } = await api.post('/cities', cityData);
    return data;
  },

  // PUT /cities/{cityId} - Update city
  updateCity: async (cityId: number, cityData: UpdateCityDto): Promise<City> => {
    const { data } = await api.put(`/cities/${cityId}`, cityData);
    return data;
  },

  // Delete city (DELETE /cities/{cityId})
  deleteCity: async (cityId: number): Promise<void> => {
    await api.delete(`/cities/${cityId}`);
  },
};
