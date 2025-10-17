export interface FilterStatisticsProps {
  filteredCount: number;
  totalCount: number;
  selectedAmenities: string[];
  filterMode: 'any' | 'all';
  hasActiveFilters: boolean;
}