import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { citiesApi } from '../api';
import { useNotification } from '@/shared/hooks/useNotification';
import { QUERY_KEYS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import type { CityFilters, CreateCityDto, UpdateCityDto } from '../types';

/**
 * Hook for managing cities
 * Provides CRUD operations for cities with React Query
 */
export const useCities = (filters?: CityFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all cities with filters
  const { data: cities, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.CITIES, filters],
    queryFn: () => citiesApi.getCities(filters),
  });

  // Create city mutation
  const createCityMutation = useMutation({
    mutationFn: (cityData: CreateCityDto) => citiesApi.createCity(cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CITIES] });
      notify(SUCCESS_MESSAGES.CITY_CREATED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.CITY_CREATE_FAILED, 'error');
    },
  });

  // Update city mutation
  const updateCityMutation = useMutation({
    mutationFn: ({ cityId, data }: { cityId: number; data: UpdateCityDto }) =>
      citiesApi.updateCity(cityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CITIES] });
      notify(SUCCESS_MESSAGES.CITY_UPDATED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.CITY_UPDATE_FAILED, 'error');
    },
  });

  // Delete city mutation
  const deleteCityMutation = useMutation({
    mutationFn: (cityId: number) => citiesApi.deleteCity(cityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CITIES] });
      notify(SUCCESS_MESSAGES.CITY_DELETED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.CITY_DELETE_FAILED, 'error');
    },
  });

  return {
    cities,
    isLoading,
    error,
    refetch,
    createCity: createCityMutation.mutate,
    updateCity: updateCityMutation.mutate,
    deleteCity: deleteCityMutation.mutate,
    isCreating: createCityMutation.isPending,
    isUpdating: updateCityMutation.isPending,
    isDeleting: deleteCityMutation.isPending,
  };
};

/**
 * Hook for fetching a single city
 * @param id - City ID
 */
export const useCity = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CITY, id],
    queryFn: () => citiesApi.getCityById(id),
    enabled: !!id,
  });
};
