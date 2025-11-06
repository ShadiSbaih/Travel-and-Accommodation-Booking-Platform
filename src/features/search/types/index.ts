export interface SearchFormData {
  query: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
}

export interface SearchResultsSectionProps {
  data?: import('@/features/hotels/types').SearchResultDTO[];
  rawData?: import('@/features/hotels/types').SearchResultDTO[];
  isLoading: boolean;
  error: unknown;
  hasActiveFilters: boolean;
  refetch?: () => void;
  hasSearchQuery?: boolean;
}
