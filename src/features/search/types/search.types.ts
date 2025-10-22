export interface SearchFormData {
  query: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
}

export interface SearchResultsSectionProps {
  data?: import('@/features/hotels/types/hotel.types').SearchResultDTO[];
  rawData?: import('@/features/hotels/types/hotel.types').SearchResultDTO[];
  isLoading: boolean;
  error: unknown;
  hasActiveFilters: boolean;
}
