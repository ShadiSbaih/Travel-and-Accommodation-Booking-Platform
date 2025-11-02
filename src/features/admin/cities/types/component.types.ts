import type { City } from './index';

export type ViewMode = 'grid' | 'list';

export interface CitiesPageHeaderProps {
  citiesCount: number;
  hasSearchQuery: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddCity: () => void;
}

export interface CitiesSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export interface CitiesContentProps {
  cities: City[];
  viewMode: ViewMode;
  isLoading: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onEdit: (city: City) => void;
}

export interface EmptyCitiesStateProps {
  hasSearchQuery: boolean;
  onAddCity: () => void;
}
