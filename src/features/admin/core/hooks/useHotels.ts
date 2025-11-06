import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelsApi } from '../api';
import { useNotification } from '@/shared/hooks/useNotification';
import { QUERY_KEYS, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';
import type { HotelFilters, CreateHotelDto, UpdateHotelDto } from '../types';

/**
 * Hook for managing hotels
 * Provides CRUD operations for hotels with React Query
 */
export const useHotels = (filters?: HotelFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all hotels with filters
  const { data: hotels, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.HOTELS, filters],
    queryFn: () => hotelsApi.getHotels(filters),
  });

  // Create hotel mutation
  const createHotelMutation = useMutation({
    mutationFn: (hotelData: CreateHotelDto) => hotelsApi.createHotel(hotelData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOTELS] });
      notify(SUCCESS_MESSAGES.HOTEL_CREATED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.HOTEL_CREATE_FAILED, 'error');
    },
  });

  // Update hotel mutation
  const updateHotelMutation = useMutation({
    mutationFn: ({ hotelId, data }: { hotelId: number; data: UpdateHotelDto }) =>
      hotelsApi.updateHotel(hotelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOTELS] });
      notify(SUCCESS_MESSAGES.HOTEL_UPDATED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.HOTEL_UPDATE_FAILED, 'error');
    },
  });

  // Delete hotel mutation
  const deleteHotelMutation = useMutation({
    mutationFn: (hotelId: number) => hotelsApi.deleteHotel(hotelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOTELS] });
      notify(SUCCESS_MESSAGES.HOTEL_DELETED, 'success');
    },
    onError: () => {
      notify(ERROR_MESSAGES.HOTEL_DELETE_FAILED, 'error');
    },
  });

  return {
    hotels,
    isLoading,
    error,
    refetch,
    createHotel: createHotelMutation.mutate,
    updateHotel: updateHotelMutation.mutate,
    deleteHotel: deleteHotelMutation.mutate,
    isCreating: createHotelMutation.isPending,
    isUpdating: updateHotelMutation.isPending,
    isDeleting: deleteHotelMutation.isPending,
  };
};

/**
 * Hook for fetching a single hotel
 * @param id - Hotel ID
 */
export const useHotel = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.HOTEL, id],
    queryFn: () => hotelsApi.getHotelById(id),
    enabled: !!id,
  });
};
