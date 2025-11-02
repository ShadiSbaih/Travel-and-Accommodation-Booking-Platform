import { useQuery } from '@tanstack/react-query';
import amenitiesApi from '@/core/api/amenities.api';
import type { Amenity } from '@/features/hotels/types';

export const useAmenities = () => {
  return useQuery<Amenity[]>({
    queryKey: ['amenities'],
    queryFn: amenitiesApi.getAmenities,
    staleTime: 10 * 60 * 1000, // 10 minutes - amenities don't change frequently
    gcTime: 15 * 60 * 1000, // 15 minutes garbage collection
  });
};
