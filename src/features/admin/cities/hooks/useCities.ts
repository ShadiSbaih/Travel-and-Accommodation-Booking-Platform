import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { citiesApi } from '../api/cities.api';
import type { City, CityFilters } from '../types/city.types';
import { useNotification } from '@/shared/hooks/useNotification';

export const useCities = (filters?: CityFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all cities
  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities', filters],
    queryFn: () => citiesApi.getCities(filters),
  });

  // Create city mutation
  const createCityMutation = useMutation({
    mutationFn: (cityData: Omit<City, 'id'>) => citiesApi.createCity(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      notify('City created successfully', 'success');
    },
    onError: () => {
      notify('Failed to create city', 'error');
    },
  });

  // Update city mutation
  const updateCityMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<City> }) =>
      citiesApi.updateCity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      notify('City updated successfully', 'success');
    },
    onError: () => {
      notify('Failed to update city', 'error');
    },
  });

  // Delete city mutation
  const deleteCityMutation = useMutation({
    mutationFn: (id: number) => citiesApi.deleteCity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      notify('City deleted successfully', 'success');
    },
    onError: () => {
      notify('Failed to delete city', 'error');
    },
  });

  return {
    cities,
    isLoading,
    error,
    createCity: createCityMutation.mutate,
    updateCity: updateCityMutation.mutate,
    deleteCity: deleteCityMutation.mutate,
    isCreating: createCityMutation.isPending,
    isUpdating: updateCityMutation.isPending,
    isDeleting: deleteCityMutation.isPending,
  };
};

export const useCity = (id: number) => {
  return useQuery({
    queryKey: ['city', id],
    queryFn: () => citiesApi.getCityById(id),
    enabled: !!id,
  });
};
