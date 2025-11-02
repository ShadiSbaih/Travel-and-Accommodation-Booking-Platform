import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { citiesApi } from '../api/cities.api';
import type { CityFilters, CreateCityDto, UpdateCityDto } from '../types';
import { useNotification } from '@/shared/hooks/useNotification';

export const useCities = (filters?: CityFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all cities with filters (name, country)
  const { data: cities, isLoading, error } = useQuery({
    queryKey: ['cities', filters],
    queryFn: () => citiesApi.getCities(filters),
  });

  // Create city mutation - POST /cities
  const createCityMutation = useMutation({
    mutationFn: (cityData: CreateCityDto) => citiesApi.createCity(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      notify('City created successfully', 'success');
    },
    onError: () => {
      notify('Failed to create city', 'error');
    },
  });

  // Update city mutation - PUT /cities/{cityId}
  const updateCityMutation = useMutation({
    mutationFn: ({ cityId, data }: { cityId: number; data: UpdateCityDto }) =>
      citiesApi.updateCity(cityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
      notify('City updated successfully', 'success');
    },
    onError: () => {
      notify('Failed to update city', 'error');
    },
  });

  // Delete city mutation - DELETE /cities/{cityId}
  const deleteCityMutation = useMutation({
    mutationFn: (cityId: number) => citiesApi.deleteCity(cityId),
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
