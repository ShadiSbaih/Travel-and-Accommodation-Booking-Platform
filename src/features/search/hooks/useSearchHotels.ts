import { useQuery } from '@tanstack/react-query';
import searchApi from '../api/search.api';
import type { SearchResultDTO } from '@/features/hotels/types';

interface SearchConfig {
  query: string;
  adults: number;
  children: number;
  rooms: number;
}

export const useSearchHotels = ({ query, adults, children, rooms }: SearchConfig) => {
  return useQuery<SearchResultDTO[]>({
    queryKey: ['searchResults', query, adults, children, rooms],
    queryFn: () =>
      searchApi.searchHotels({
        city: query,
        adults,
        children,
        numberOfRooms: rooms,
      }),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
