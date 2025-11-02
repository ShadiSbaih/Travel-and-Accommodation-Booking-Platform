import { useQuery } from '@tanstack/react-query';
import homePageApi from '../api/home-page.api';
import type { FeaturedDealDto } from '../types';

export const useFeaturedDeals = () => {
  return useQuery<FeaturedDealDto[]>({
    queryKey: ['featuredDeals'],
    queryFn: () => homePageApi.getFeaturedDeals(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};
