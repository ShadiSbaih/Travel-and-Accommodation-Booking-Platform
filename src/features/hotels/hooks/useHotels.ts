import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelsApi } from '../api/hotels.api';
import type { Hotel, HotelFilters } from '../types/hotel.types';

// Query keys for hotels
const hotelKeys = {
  all: ['hotels'] as const,
  lists: () => [...hotelKeys.all, 'list'] as const,
  list: (filters?: HotelFilters) => [...hotelKeys.lists(), { filters }] as const,
  details: () => [...hotelKeys.all, 'detail'] as const,
  detail: (id: number) => [...hotelKeys.details(), id] as const,
  gallery: (id: number) => [...hotelKeys.all, 'gallery', id] as const,
  reviews: (id: number) => [...hotelKeys.all, 'reviews', id] as const,
};

//GET: Fetch hotels list
export const useHotels = (filters?: HotelFilters) => {
  return useQuery({
    queryKey: hotelKeys.list(filters),
    queryFn: () => hotelsApi.getHotels(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

//GET: Fetch single hotel
export const useHotel = (id: number) => {
  return useQuery({
    queryKey: hotelKeys.detail(id),
    queryFn: () => hotelsApi.getHotelById(id),
    enabled: !!id, // Only run if id exists
  });
};

//GET: Fetch hotel gallery
export const useHotelGallery = (id: number) => {
  return useQuery({
    queryKey: hotelKeys.gallery(id),
    queryFn: () => hotelsApi.getHotelGallery(id),
    enabled: !!id,
  });
};

//GET: Fetch hotel reviews
export const useHotelReviews = (id: number) => {
  return useQuery({
    queryKey: hotelKeys.reviews(id),
    queryFn: () => hotelsApi.getHotelReviews(id),
    enabled: !!id,
  });
};

//POST: Create hotel (Admin)
export const useCreateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (hotelData: Omit<Hotel, 'id'>) => hotelsApi.createHotel(hotelData),
    onSuccess: () => {
      // Invalidate and refetch hotels list
      queryClient.invalidateQueries({ queryKey: hotelKeys.all });
    },
  });
};

//PUT: Update hotel (Admin)
export const useUpdateHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Hotel> }) => 
      hotelsApi.updateHotel(id, data),
    onSuccess: (_, variables) => {
      // Invalidate specific hotel and list
      queryClient.invalidateQueries({ queryKey: hotelKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: hotelKeys.all });
    },
  });
};

//DELETE: Delete hotel (Admin)
export const useDeleteHotel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => hotelsApi.deleteHotel(id),
    onSuccess: () => {
      // Invalidate hotels list
      queryClient.invalidateQueries({ queryKey: hotelKeys.all });
    },
  });
};