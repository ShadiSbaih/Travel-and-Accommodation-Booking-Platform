import { useQuery } from '@tanstack/react-query';
import homePageApi from '../api/home-page.api';
import type { RecentlyVisitedHotelDto } from '../types';

export const useRecentlyVisitedHotels = (userId: string | null | undefined) => {
  return useQuery<RecentlyVisitedHotelDto[]>({
    queryKey: ['recentlyVisitedHotels', userId],
    queryFn: () => homePageApi.getRecentlyVisitedHotels(userId as string),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};
