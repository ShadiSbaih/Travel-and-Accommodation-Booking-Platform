import { useQuery } from '@tanstack/react-query';
import homePageApi from '../api/home-page.api';
import type { TrendingDestinationDto } from '../types';

export const useTrendingDestinations = () => {
  return useQuery<TrendingDestinationDto[]>({
    queryKey: ['trendingDestinations'],
    queryFn: () => homePageApi.getTrendingDestinations(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};
