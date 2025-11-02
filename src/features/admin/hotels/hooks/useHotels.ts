import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelsApi } from '../api/hotels.api';
import type { HotelFilters, CreateHotelDto, UpdateHotelDto } from '../types';
import { useNotification } from '@/shared/hooks/useNotification';

export const useHotels = (filters?: HotelFilters) => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  // Get all hotels with filters
  const { data: hotels, isLoading, error, refetch } = useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelsApi.getHotels(filters),
  });

  // Create hotel mutation - POST /hotels
  const createHotelMutation = useMutation({
    mutationFn: (hotelData: CreateHotelDto) => hotelsApi.createHotel(hotelData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      notify('Hotel created successfully', 'success');
    },
    onError: () => {
      notify('Failed to create hotel', 'error');
    },
  });

  // Update hotel mutation - PUT /hotels/{hotelId}
  const updateHotelMutation = useMutation({
    mutationFn: ({ hotelId, data }: { hotelId: number; data: UpdateHotelDto }) =>
      hotelsApi.updateHotel(hotelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      notify('Hotel updated successfully', 'success');
    },
    onError: () => {
      notify('Failed to update hotel', 'error');
    },
  });

  // Delete hotel mutation - DELETE /hotels/{hotelId}
  const deleteHotelMutation = useMutation({
    mutationFn: (hotelId: number) => hotelsApi.deleteHotel(hotelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
      notify('Hotel deleted successfully', 'success');
    },
    onError: () => {
      notify('Failed to delete hotel', 'error');
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

export const useHotel = (id: number) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => hotelsApi.getHotelById(id),
    enabled: !!id,
  });
};
